---
layout: page
author: jules
excerpt: At Ostmodern, we build a variety of mobile applications with a focus on VOD, OTT and sports. While the apps vary in functionality, the Android team uses a proven architectural design throughout each project, which is constantly refined and improved. Our current structure is a combination of MVVM (Model-View-ViewModel), with heavy usage of Dagger for dependency injection, and RxJava for data flows.
category: blog
---

*1st March, 2019*

### Our journey with the Data Binding library while building a large greenfield application.

![](https://cdn-images-1.medium.com/max/3528/1*SfBCpqeC_45tLKHpIl35gA.jpeg)

At [Ostmodern](https://medium.com/@Ostmodern), we build a variety of mobile applications with a focus on VOD, OTT and sports. While the apps vary in functionality, the Android team uses a proven architectural design throughout each project, which is constantly refined and improved. Our current structure is a combination of MVVM (Model-View-ViewModel), with heavy usage of Dagger for dependency injection, and RxJava for data flows.

We love experimenting with new technology and regularly discuss new patterns and libraries as a team. Our architecture is heavily influenced by these discussions and our early adoption of **Kotlin** and move from Model-View-Presenter to MVVM are some previous outcomes of these talks.

In the lead up to our latest project kick-off, we reignited our previous [Room](https://developer.android.com/topic/libraries/architecture/room) vs [Realm](https://realm.io/) data persistence debate. Google’s new library (Room) is built on top of SQLite, making it a powerful and lightweight competitor to the popular Realm library, which is commonly used for its ease of use when working with complex model relationships.

Migrating to Room had appealed to us for the above-mentioned reasons and also because it plugs into RxJava right out of the box, but a stable build wasn’t available last time around. This time, we nearly went with Room. In the end, we decided to stick with Realm as the new project data structure consisted of a **complex class hierarchy**. While class relationships can be managed in Room, they require a bit of boilerplate and we felt the implementation would be much simpler to handle with Realm, especially with our prior usage of the library.

A second discussion was focused on [Data Binding](https://developer.android.com/topic/libraries/data-binding/). As a technique, it isn’t new. It exists in many frameworks and was introduced to Android back in 2015 — yet it is often cast aside.

We had chosen MVVM for a better separation of concerns and reduced view logic, thus Data Binding seemed an obvious choice for additional research: it enhanced both of these and could easily extend our existing architecture without major restructuring.

### Introducing Data Binding

Data Binding aims to simplify the process of updating UI components with data. By binding UI components directly to ViewModel properties, we could remove the need for UI framework calls in our Fragments/Activities.

Google recommended that developers use the Data Binding library for improved memory usage and performance, but the **simplicity and reduced boilerplate** was also appealing to us.

Say goodbye to countless lines of boring code!

    profileTextName.text = model.profileName
    profileTextSubtitle.text = model.profileSubtitle
    profileTextHeader.text = model.profileHeader

With Data Binding, TextViews, EditTexts and other View classes state their data source directly in the XML layout file and will observe these fields for changes with [minimal setup](https://developer.android.com/topic/libraries/data-binding/start).

    <layout
        <data>
            <variable
                name="viewModel"
                type="package.profile.ProfileViewModel" />
        </data>

        <TextView>
            ...        
            android:text="@={viewModel.profileName}" />

    </layout>

Shown above is a Data Binding compatible layout file. Layouts now have a reference to the related ViewModel (or presenter if using MVP). This allows us to keep logic out of our Fragments and Activities, **making our project easier to test and debug**.

Data Binding seemed useful and an obvious choice for further research, as it could extend to our existing architecture without considerable changes, so we gave it a go.

![](https://cdn-images-1.medium.com/max/10326/1*IrRvF5R4I8PfjnxIoYTzAQ.jpeg)

[Early investigations](https://github.com/Julesssss/Android-MVVM) seemed promising. Not only did it require less code, but our IDE (Android Studio) also had built-in support for converting layouts to Data Binding compatible files, and it led to a better separation of logic from views — one of our primary concerns.

This encouraged us to attempt wider usage. We were interested in what issues might arise at scale, but eager to find out more. To that end, when the new project kicked off, we started building the first features with Data Binding.

### …1 Month later: First Impressions

Initially, our usage didn’t stray far from our previous investigations. The early features were simple and our UI components observed fields in the ViewModel without issue. We enjoyed our clean and simple Fragments.

It felt like we were learning the Android platform all over again. Want to add a TextChangedListener? Need to bind to an included layout? Progress wasn’t fast. As early adopters we had to navigate a reduced knowledge base, but **each new discovery felt rewarding**.

While it took us a while to work out our general approach to Data Binding, we were happy to find that views were less dependent on logic for determining state.

*It felt like a natural iteration to our architecture.*

We also started to work out our rules and exceptions. One of our team members suggested that we shouldn’t bind function calls to the onClick attribute in layout files. She had used Data Binding previously for a different platform and found that functionality became obfuscated and hard to read.

Tracing function calls back to the originating view click was time-consuming. By keeping UI component clicks in code, it again became simple to get an overview of flow when revisiting unfamiliar pages.

The real benefit wasn’t initially obvious, but soon felt completely natural. Because UI components state were bound to ViewModel properties, we became able to further integrate RxJava to our architecture. Single subscribe-able Rx flows which emitted state changes was **the dream for functional programming proponents**. This became easily achievable within our ViewModels thanks to data bound properties.

    var registerButtonEnabled = false
    var progressBarVisible = false
    var errorMessageVisible = false

    userRepository.registerSocial(...)
            .doOnSubscribe {
                progressBarVisible = true
                registerButtonEnabled = false
                errorMessageVisible = false
                notifyChange()
            }.doOnError {
                progressBarVisible = false
                registerButtonEnabled = true
                errorMessageVisible = true
                notifyChange()
            }.doFinally {
                progressBarVisible = false
                registerButtonEnabled = true
                notifyChange()
            }

As the xml layouts observed the ViewModels properties shown above, state could be controlled from a simple Rx chain: an excellent way to move logic from views and allow them to be tested with ease.

### …3 Months later: Second thoughts

One of the first complications we found with Data Binding was with loading images. A simple task, but one which usually requires an Image loading library for accessible and **hassle-free image caching**.

However, we quickly found that we couldn’t use the library from within the layout file like we could for setting text — requiring us to revert to old methods. Mixing old and new techniques led us *away* from our desired clean and readable code.

    fun onBindView(_profile: Profile) {

        // simple and clean data binding
        binding.profile= _profile

        // old methods returned to haunt us
        profileImageUser.loadWithGlide(_profile.imageUrl)
        profileImageCountryFlag.loadWithGlide(_profile.flagUrl)
    }

One solution to this was to create a custom ImageView class and add specific image library functions that could be called from the XML file. On the other hand, we worried that glueing libraries to custom views was not scaleable and went against our desire for separation of concerns.

Unfortunately, this wasn’t the only thing that we couldn’t solve with Data Binding. Another essential Android UI Component is **EditText**, used for user input. In our case, we needed to listen for input changes so that we could enable/disable the Login button depending on whether all input fields were filled.

     */
     * Called when EditText values are changed. Used to disable button
     * when all fields are not complete. Needs to be delayed as bound
     * inputs are updated after this function is called.
     */
     fun onInputChanged(s: CharSequence, ...) {
        delay({
            loginButtonEnabled =
               inputUsername.isNotEmpty() && inputPassword.isNotEmpty()
            notifyChange()
        }, 50)
    }

The problem was that data bound fields inputUsername & inputPassword were not being updated fast enough when using Data Binding. When receiving an onInputChanged callback from the EditText, the ViewModel hadn’t yet registered the new values — meaning that we had to add an artificial delay!

**More issues became apparent at scale**. Navigating a large code base where old features became unfamiliar was tricky. Adapters required generated binding classes, rather than a clickable layout resource Id during setup. Therefore, navigation between classes became less simple. We had to decipher generated class names to find the layout files. Annoying *and *time consuming in a project with over 140 layout files.

*Later on we learnt that the generated class bindings are customisable and [can be renamed](https://developer.android.com/topic/libraries/data-binding/generated-binding#custom_binding_class_names), solving the deciphering problem.*

### … 6 months later: Reflecting on our experience

As the project came to an end we sat down to review our experiences with Data Binding.

We loved that this technique let us **move logic out of our View classes** and made future changes fast once initially set up. However, while we hadn’t expected the process of using it in a large project to be without issue, we felt that the workarounds and exceptions reduced and sometimes *nullified* the benefits of Data Binding usage.

Simplifying our view classes, increased separation and better state management were t**he desired objectives** and outcomes. While Data Binding helped us to achieve these, many more issues than we had hoped for emerged.

We had also since been informed about more recent, better solutions to help us achieve the above-stated goals. Our current favourite being a Redux/Model-View-Intent influenced ViewState management pattern which facilitates View classes with immutable state data classes, making more of the business logic testable. This can be extended with a modularised state reducer, responsible for taking actions and manipulating state.

Important lessons were learned and we don’t regret attempting to use the library, but have decided as a team not to give Data Binding a place in our base architecture for future projects. Instead, we will be focusing on the referenced ViewState pattern for better state management.

With that said, **Data Binding shouldn’t be overlooked** as a library for simple or minimum viable products and there may be new or missed solutions to the issues we faced. Our advice would be for you to investigate the library’s pitfalls with your own project in mind and ensure that rules and guidelines on its use are defined before committing fully.

## Thank you for reading!
