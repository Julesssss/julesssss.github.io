var hostname = "https://julesssss.github.io";
var index = lunr(function () {
    this.field('title')
    this.field('content', {boost: 10})
    this.field('category')
    this.field('tags')
    this.ref('id')
});



    index.add({
      title: "Android Data Binding: A Practical Experience",
      category: "blog",
      content: "1st March, 2019\n\nOur journey with the Data Binding library while building a large greenfield application.\n\n\n\nAt Ostmodern, we build a variety of mobile applications with a focus on VOD, OTT and sports. While the apps vary in functionality, the Android team uses a proven architectural design throughout each project, which is constantly refined and improved. Our current structure is a combination of MVVM (Model-View-ViewModel), with heavy usage of Dagger for dependency injection, and RxJava for data flows.\n\nWe love experimenting with new technology and regularly discuss new patterns and libraries as a team. Our architecture is heavily influenced by these discussions and our early adoption of Kotlin and move from Model-View-Presenter to MVVM are some previous outcomes of these talks.\n\nIn the lead up to our latest project kick-off, we reignited our previous Room vs Realm data persistence debate. Google’s new library (Room) is built on top of SQLite, making it a powerful and lightweight competitor to the popular Realm library, which is commonly used for its ease of use when working with complex model relationships.\n\nMigrating to Room had appealed to us for the above-mentioned reasons and also because it plugs into RxJava right out of the box, but a stable build wasn’t available last time around. This time, we nearly went with Room. In the end, we decided to stick with Realm as the new project data structure consisted of a complex class hierarchy. While class relationships can be managed in Room, they require a bit of boilerplate and we felt the implementation would be much simpler to handle with Realm, especially with our prior usage of the library.\n\nA second discussion was focused on Data Binding. As a technique, it isn’t new. It exists in many frameworks and was introduced to Android back in 2015 — yet it is often cast aside.\n\nWe had chosen MVVM for a better separation of concerns and reduced view logic, thus Data Binding seemed an obvious choice for additional research: it enhanced both of these and could easily extend our existing architecture without major restructuring.\n\nIntroducing Data Binding\n\nData Binding aims to simplify the process of updating UI components with data. By binding UI components directly to ViewModel properties, we could remove the need for UI framework calls in our Fragments/Activities.\n\nGoogle recommended that developers use the Data Binding library for improved memory usage and performance, but the simplicity and reduced boilerplate was also appealing to us.\n\nSay goodbye to countless lines of boring code!\n\nprofileTextName.text = model.profileName\nprofileTextSubtitle.text = model.profileSubtitle\nprofileTextHeader.text = model.profileHeader\n\n\nWith Data Binding, TextViews, EditTexts and other View classes state their data source directly in the XML layout file and will observe these fields for changes with minimal setup.\n\n&lt;layout\n    &lt;data&gt;\n        &lt;variable\n            name=\"viewModel\"\n            type=\"package.profile.ProfileViewModel\" /&gt;\n    &lt;/data&gt;\n\n    &lt;TextView&gt;\n        ...        \n        android:text=\"@={viewModel.profileName}\" /&gt;\n\n&lt;/layout&gt;\n\n\nShown above is a Data Binding compatible layout file. Layouts now have a reference to the related ViewModel (or presenter if using MVP). This allows us to keep logic out of our Fragments and Activities, making our project easier to test and debug.\n\nData Binding seemed useful and an obvious choice for further research, as it could extend to our existing architecture without considerable changes, so we gave it a go.\n\n\n\nEarly investigations seemed promising. Not only did it require less code, but our IDE (Android Studio) also had built-in support for converting layouts to Data Binding compatible files, and it led to a better separation of logic from views — one of our primary concerns.\n\nThis encouraged us to attempt wider usage. We were interested in what issues might arise at scale, but eager to find out more. To that end, when the new project kicked off, we started building the first features with Data Binding.\n\n…1 Month later: First Impressions\n\nInitially, our usage didn’t stray far from our previous investigations. The early features were simple and our UI components observed fields in the ViewModel without issue. We enjoyed our clean and simple Fragments.\n\nIt felt like we were learning the Android platform all over again. Want to add a TextChangedListener? Need to bind to an included layout? Progress wasn’t fast. As early adopters we had to navigate a reduced knowledge base, but each new discovery felt rewarding.\n\nWhile it took us a while to work out our general approach to Data Binding, we were happy to find that views were less dependent on logic for determining state.\n\nIt felt like a natural iteration to our architecture.\n\nWe also started to work out our rules and exceptions. One of our team members suggested that we shouldn’t bind function calls to the onClick attribute in layout files. She had used Data Binding previously for a different platform and found that functionality became obfuscated and hard to read.\n\nTracing function calls back to the originating view click was time-consuming. By keeping UI component clicks in code, it again became simple to get an overview of flow when revisiting unfamiliar pages.\n\nThe real benefit wasn’t initially obvious, but soon felt completely natural. Because UI components state were bound to ViewModel properties, we became able to further integrate RxJava to our architecture. Single subscribe-able Rx flows which emitted state changes was the dream for functional programming proponents. This became easily achievable within our ViewModels thanks to data bound properties.\n\nvar registerButtonEnabled = false\nvar progressBarVisible = false\nvar errorMessageVisible = false\n\nuserRepository.registerSocial(...)\n        .doOnSubscribe {\n            progressBarVisible = true\n            registerButtonEnabled = false\n            errorMessageVisible = false\n            notifyChange()\n        }.doOnError {\n            progressBarVisible = false\n            registerButtonEnabled = true\n            errorMessageVisible = true\n            notifyChange()\n        }.doFinally {\n            progressBarVisible = false\n            registerButtonEnabled = true\n            notifyChange()\n        }\n\n\nAs the xml layouts observed the ViewModels properties shown above, state could be controlled from a simple Rx chain: an excellent way to move logic from views and allow them to be tested with ease.\n\n…3 Months later: Second thoughts\n\nOne of the first complications we found with Data Binding was with loading images. A simple task, but one which usually requires an Image loading library for accessible and hassle-free image caching.\n\nHowever, we quickly found that we couldn’t use the library from within the layout file like we could for setting text — requiring us to revert to old methods. Mixing old and new techniques led us away from our desired clean and readable code.\n\nfun onBindView(_profile: Profile) {\n\n    // simple and clean data binding\n    binding.profile= _profile\n\n    // old methods returned to haunt us\n    profileImageUser.loadWithGlide(_profile.imageUrl)\n    profileImageCountryFlag.loadWithGlide(_profile.flagUrl)\n}\n\n\nOne solution to this was to create a custom ImageView class and add specific image library functions that could be called from the XML file. On the other hand, we worried that glueing libraries to custom views was not scaleable and went against our desire for separation of concerns.\n\nUnfortunately, this wasn’t the only thing that we couldn’t solve with Data Binding. Another essential Android UI Component is EditText, used for user input. In our case, we needed to listen for input changes so that we could enable/disable the Login button depending on whether all input fields were filled.\n\n */\n * Called when EditText values are changed. Used to disable button\n * when all fields are not complete. Needs to be delayed as bound\n * inputs are updated after this function is called.\n */\n fun onInputChanged(s: CharSequence, ...) {\n    delay({\n        loginButtonEnabled =\n           inputUsername.isNotEmpty() &amp;&amp; inputPassword.isNotEmpty()\n        notifyChange()\n    }, 50)\n}\n\n\nThe problem was that data bound fields inputUsername &amp; inputPassword were not being updated fast enough when using Data Binding. When receiving an onInputChanged callback from the EditText, the ViewModel hadn’t yet registered the new values — meaning that we had to add an artificial delay!\n\nMore issues became apparent at scale. Navigating a large code base where old features became unfamiliar was tricky. Adapters required generated binding classes, rather than a clickable layout resource Id during setup. Therefore, navigation between classes became less simple. We had to decipher generated class names to find the layout files. Annoying *and *time consuming in a project with over 140 layout files.\n\nLater on we learnt that the generated class bindings are customisable and can be renamed, solving the deciphering problem.\n\n… 6 months later: Reflecting on our experience\n\nAs the project came to an end we sat down to review our experiences with Data Binding.\n\nWe loved that this technique let us move logic out of our View classes and made future changes fast once initially set up. However, while we hadn’t expected the process of using it in a large project to be without issue, we felt that the workarounds and exceptions reduced and sometimes nullified the benefits of Data Binding usage.\n\nSimplifying our view classes, increased separation and better state management were the desired objectives and outcomes. While Data Binding helped us to achieve these, many more issues than we had hoped for emerged.\n\nWe had also since been informed about more recent, better solutions to help us achieve the above-stated goals. Our current favourite being a Redux/Model-View-Intent influenced ViewState management pattern which facilitates View classes with immutable state data classes, making more of the business logic testable. This can be extended with a modularised state reducer, responsible for taking actions and manipulating state.\n\nImportant lessons were learned and we don’t regret attempting to use the library, but have decided as a team not to give Data Binding a place in our base architecture for future projects. Instead, we will be focusing on the referenced ViewState pattern for better state management.\n\nWith that said, Data Binding shouldn’t be overlooked as a library for simple or minimum viable products and there may be new or missed solutions to the issues we faced. Our advice would be for you to investigate the library’s pitfalls with your own project in mind and ensure that rules and guidelines on its use are defined before committing fully.\n\nThank you for reading!\n",
      tags: [],
      id: 0
    });
    

    index.add({
      title: "Arsenal",
      category: "project",
      content: "July 2018 - February 2019\nProfessional project\n\nThe official Arsenal FC app. Supports live video streaming and audio commentary of matches, live match day feed with push notifications, news articles, fixtures, league table and player profiles.\n\nThe project follows the MVVM pattern (Model-View-ViewModel). Technologies used include Dagger2, RxJava/RxAndroid, Realm and Android architecture components.\n\n\n\n\n\nView on the PlayStore\n",
      tags: [],
      id: 1
    });
    

    index.add({
      title: "Nasa Astronomy Photo Of The Day",
      category: "project",
      content: "Personal project\n\nA Kotlin Android app demonstrating a modern architecture consisting of Kotlin, MVVM, RxJava, Koin, LiveData and lifecycle aware ViewModels.\n\nView state is represented by an immutable data class emitted as a LiveData subscription from the ViewModels.\n\nView project on Github\n\n\n\n\nArchitecture\n\nMVVM, Android Arch ViewModel, RxJava, RxAndroid, LiveData, Koin\n\nTesting\nJunit, Mockito, Espresso\n\nBuilding the project\n\nTo build the project, you will need your own auth token for the NASA APOD API (sign up here). If you don’t follow the steps below, the project will not compile.\n\nOnce you have a key, you will need to make it available as a gradle.properties file. Navigate to ‘$HOME/.gradle/’ and if a gradle.properties file does not exist, create it.\n\nAdd the following to the gradle.properties file, replacing XYZ for your NASA API key.\nnasaApiKey=\"ABCDEFGHIJKLMNOPQRSTUVWXYZ\"\n\n\nAfter a project refresh, you should see the gradle.properties file in the Android Studio project browser view under ‘Gradle Scripts’. Switch to the Android view if you don’t see ‘Gradle Scripts’\n",
      tags: [],
      id: 2
    });
    

    index.add({
      title: "Handling Gradle Dependencies In Modularised Android Projects",
      category: "blog",
      content: "28th October, 2018\n\n\n  How do I share dependencies between Android modules?\n\n\nWith the benefits that modularised projects bring it would seem like this should be a solved problem, but it’s only recently that a good solution to managing multi-module dependencies has become available.\n\nAs of late 2017, there was no satisfactory solution to this problem. The best option was to declare dependency version strings in a shared build.gradle file to ensure that each module implemented the same version of the library.\n\nThis works, but the repetition isn’t great and the solution doesn’t scale well as module count and complexity increases…\n\nIntroducing Gradle 4.0 🎉\n\nIn October 2017 Gradle 4.0 was released along with Android Gradle plugin 3.0.0. Some of the improvements included faster build speeds due to better parallelism, Java 8 support for certain features and faster incremental builds.\n\n\n\nHowever, the change that we’re interested in was the addition of new Gradle dependency configurations.\n\nHopefully by now you’re already using Gradle 4.0+ with Android Studio Gradle plugin 3.0.0+, but if not you’ll first need to update.\n\nNew dependency configurations\n\nTwo new dependency configurations replace ‘compile’ and allow us to decide whether a modules Gradle dependencies are accessible to any other module which depends upon it, or only within the module. (a simple comparison is using public/private to set the visibility of variables/functions). This allows us to keep a clear layer of separation between modules while removing the repetition of declaring dependencies in multiple modules.\n\nPrevious dependency config\n\ncompile 'example.dependency:1.0.0'\n\n\nHopefully this looks familiar to you. We’re declaring our dependency on an external library within the module that requires it.\n\nNew and improved dependency config\n\nimplementation 'example.dependency:1.0.0'\n// or\napi 'example.dependency:1.0.0'\n\n\n\n  implementation → this dependency is only available to entities within this module\n\n\n\n  api → this dependency will also be available within any module which depends on this module\n\n\nThe change is as simple as that. For any dependencies which should be self contained within the module, use implementation. For any dependencies which should also be made available to modules which depend on the module, use api.\n\nArchitecture\n\nWe can now replace compile with either implementation or api depending on the structure of our modules and setup a chain of dependencies which makes sense for our architecture.\n\nHere are a couple of simple example projects with alternate module architectures and the correct usage in each case.\n\n\n\nHere’s a simple app which has only a single module: app. In this case we only need to replace compile with implementation as there are no other modules which might be able to share dependencies.\n\n\n\nHere’s a more complex app with three modules: app, tv and core.\n\n\n  \n    Both app and tv modules depend on the core module\n  \n  \n    only the core module should interact directly with Retrofit, so we use implementation to ensure that the library is inaccessible from app and tv.\n  \n  \n    RxJava is required in all three modules, therefore we can use the api config to ensure that all projects depending on core can access RxJava.\n  \n\n\nHopefully a similar structure can apply to your project, but please leave a comment if you have a problem working out the correct dependency flow.\n\nNotes\n\nI recently answered this question on StackOverflow which inspired this post, check out the question for further discussion and the older solutions.\n\nIf you’re not yet taking advantage of a modularised android project, check out this detailed blog post for detailed information on the build time improvements.\n\nThanks for reading, please let me know if I’ve missed anything or if you have any further tips.\n",
      tags: [],
      id: 3
    });
    

    index.add({
      title: "Add Dagger To A Simple Android App",
      category: "blog",
      content: "23rd July, 2018\n\nA simple guide for adding Dagger2 to a modern MVVM Android project.\n\n\n\nIntro\n\nDagger is always one of the first libraries I add when starting new Android projects. Not only does is simplify the process of adding further libraries, it doesn’t have many pre-requisites and it forces you to think about project architecture early on in the setup stages.\n\nHowever, it’s hard to find a source which covers the latest features like @ContributesAndroidInjector &amp; DaggerActivity in a Kotlin code base. This article aims to walk you through the implementation step by step, explaining the how and why along the way.\n\nThe app structure was based on Rahul Singh’s Clean Architecture project, which is a great example of a modern Android app architecture. This post focuses on the dependency injection section of the architecture and I recommend reading his post for a better understanding of the rest of the components that make a modern Android application.\n\nI’m using MVVM here, but you can easily apply the steps to an MVP project as the Dagger implementation remains largely the same.\n\nImplementing Dagger is actually quite straight forward when you take the time to understand each step. I’ll begin by showing the starting project, but feel free to skip to the Dagger Setup section if you’re just looking for a reference guide.\n\nPre-Dagger\n\nTo demonstrate the implementation of Dagger we’ll need a simple app that would benefit from the addition. Lets take a look at the starting app we’ll be improving with Dagger.\n\nModern-Dagger repositiory\n\n\n\nThe app consists of an Application, MainActivity, MainViewModel and an AnalyticsHelper class. Analytics tracking is a common client request and can touch almost anywhere in your code base, so it’s a prime example of an object that would benefit from dependency injection — imagine changing the constructor of the AnalyticsHelper, then having to modify each class in which is was instantiated.\n\nIn our simplified project the AnalyticsHelper prints out the page parameter string along with the hash code of the object itself. We’ll use this hash code to demonstrate that we’re accessing the same instance of the object after implementing Dagger. Running the app at this point outputs the following logs:\n\nTracking page:\n'Application-onCreate', from AnalyticsHelper:       **757408072**\n'MainActivity-onCreate', from AnalyticsHelper:      **424961346**\n'ViewModel-initialisation', from AnalyticsHelper:   **315976019**\n'MainActivity-observingData', from AnalyticsHelper: **424961346**\n\n\nAs you can see, Application, Activity and ViewModel each have a different instance of the AnalyticsHelper class. After implementing Dagger, the same object instance will be used. This is one of the simplest changes we can demonstrate with Dagger, but is a great starting point. Lets get started!\n\nImplementation\n\nAs always, we’ll need to add the required dependencies first. As we’re using Kotlin we need to ensure that kotlin-kapt is declared as a plugin so that annotation processing works correctly.\n\nAfter a sync, we can specify our dependencies in a class annotated with @Module. We use the @Provides annotation on a function to do this, while @Singleton insures that the same instance is returned. Typically the function name is the class name prefixed with ‘provides’, but it’s not strictly necessary to do so.\n\nNext, we’ll need to create an AppComponent interface. This is where we set module types, giving Dagger the dependencies it needs to build the object graph. We only have one custom module — AppModule, AndroidInjectionModule is an internal class which maps the graph to Activities (more about this later).\n\nNow we need to modify our Application class, changing it’s super-class to DaggerApplication, implementing the applicationInjector function and using the @Inject annotation on the AnalyticsHelper parameter so that Dagger will construct the object for us.\n\nIn order to link MainActivity to the dependency graph, we’ll need a second Module which will contain individual Activity dependencies. Currently, we’re not declaring any specific dependencies, but we’ll create the structure now for future reference.\n\nWe use @ContributesAndroidInjector to set the modules for the MainActivity and will create a similar function for any additional Activities. These modules are submodules of AppModule, so any dependencies will only be available to the returned activity, whereas all AppModule dependencies will be available to the Activities.\n\nFinally, ensure you add the ActivityModule to the list of modules declared in AppComponent\n\n@Singleton @Component(modules = [(AndroidInjectionModule::class), **(ActivityBuilder::class)**, (AppModule::class)])\n\n\nSingleton AnalyticsHelper\n\nNow when we run the app, we can see that Dagger is returning the same AnalyticsHelper instance to Application and MainActivity!\n\n'Application-onCreate', from AnalyticsHelper:       **757408072**.\n'MainActivity-onCreate', from AnalyticsHelper:      **757408072**.\n'ViewModel-initialisation', from AnalyticsHelper:   **705483104**.\n'MainActivity-observingData', from AnalyticsHelper: **757408072**.\n\n\nThe exception being the ViewModel, which is still creating a new instance of the object. This requires a few extra steps, which we’ll cover in the future! In the meantime, check out the project in it’s current state below.\nModern-Dagger repository\n\nThanks for reading, please feel free to suggest changes or improvements!\n",
      tags: [],
      id: 4
    });
    

    index.add({
      title: "Formula 1 Tv",
      category: "project",
      content: "Professional project\n\nWatch live ad historic Formula 1 races, with live timings/leaderboard and multiple drive on-board cameras concurrently.\n\n\n\n",
      tags: [],
      id: 5
    });
    

    index.add({
      title: "Spotify Album Shuffle",
      category: "project",
      content: "Personal project\n\nA music player, which uses the Spotify API to add functionality for playing a random album from your library. Background gradient is generated from the album artwork.\n\n\n\n",
      tags: [],
      id: 6
    });
    

    index.add({
      title: "Auto Generate Kotlin Android Documentation With Dokka",
      category: "blog",
      content: "22nd August, 2018\n\n\n\nI’ve recently been trying to write better documentation, and after discovering how simple this was for Java projects using Android Studio was upset to find out that this doesn’t work for Android projects written in Kotlin.\n\nUntil a couple of minutes later when I found Dokka, Jet-brain’s documentation engine for Kotlin. For anyone unlucky enough to not be completely free from Java, you’ll be pleased to know it also works with mixed Java/Kotlin projects.\n\nFor a sneak peak, here’s an example of Markdown documentation that I’ve generated from a simple project.\n\nPreconditions\n\nUnfortunately, good documentation doesn’t write itself, so the first step is to comment your code properly. Dokka will pick up comments from classes, methods and properties as well as highlighting param, return and other tag comments.\n\nThankfully, that is the only precondition that’s necessary in order to use Dokka. Once we’ve setup the Dokka plugin and specified a few plugin preferences, we’ll be able to run a Gradle task which exports nicely organised, hyperlinked documentation in a couple of different formats. It’s that simple! Lets get started…\n\nPlugin Setup\n\nFor those with no patience, this commit shows the few necessary changes we need to make.\n\nFirst, in the project level build.gradle file, add the following classpath dependency (using a Dokka version variable if desired):\n\nbuildscript {\n    ext {\n      dokkaVersion = '0.9.17'\n    }\n\n    repositories {\n      jcenter()\n    }\n\n    dependencies {\n      classpath \"org.jetbrains.dokka:dokka-android-gradle-plugin:$dokkaVersion\"\n    }\n}\n\n\nNow, for each module you would like to generate documentation for, add this plugin beneath the Kotlin kapt plugin in the build.gradle file. Followed by the a Dokka configuration block.\n\nThis will most likely be the app module build.gradle for single module projects.\n\napply plugin: ‘kotlin-android-extensions’\n  apply plugin: ‘kotlin-kapt’\n  apply plugin: ‘org.jetbrains.dokka-android’\n\n…\n\nandroid {\n\n    ...\n\n    dokka {\n        outputFormat = 'html'\n        outputDirectory = \"$buildDir/javadoc\"\n    }\n\n}\n\n\n\n  outputFormat: We have a choice of 6 output formats including html, javadoc, and a few types of markdown.\n\n\n\n  outputDirectory: Choose the location you would like the documentation to be built to.\n\n\nYou can find a list of all Dokka config options on the Documentation page, but here are a few useful examples to get you started:\n\n// Do not output deprecated members\nskipDeprecated = true\n\n// Emit warnings about not documented members.\nreportUndocumented = true\n\n\nBuilding the docs\n\nThat’s all! After syncing your project you should see a new Gradle task which will generate the documentation for you.\n\n\n\nRun the Gradle task from the Android Studio Gradle window or from the terminal with ./gradlew dokka, and navigate to the output directory you specified in the config. (You will need to switch to the Project view in order to see the output folder from within Android Studio).\n\nBy default, the above output directory will output docs to the ‘project &gt; app &gt; build &gt; javadoc &gt; app’ folder.\n\n\n\nOpen the index.html file in a browser and admire your new documentation, organised by package.\n\n\n\n\n\n\n\nNow we face the harder problem of getting people to actually read our docs!\n\nThanks for reading, please let me know if I’ve missed anything or if you have any tips for using Dokka!\n",
      tags: [],
      id: 7
    });
    

    index.add({
      title: "Birthday Reminder",
      category: "project",
      content: "Personal project\n\nBirthday reminder is a simple Material Design Android app which notifies users of upcoming birthdays. Released in 2015, it has had many design and feature update since then, many coming from user requests. Recent additions include Firebase auth and realtime database for data backup. As I built this when I was quite inexperienced, it doesn’t follow any of the common Android architecture patterns, so I wouldn’t recommend using this structure elsewhere.\n\n\n\nView the code on GitHub\n\nView on the PlayStore\n",
      tags: [],
      id: 8
    });
    


var store = [{
    "title": "Android Data Binding: A Practical Experience",
    "link": "/blog/Android-Data-Binding-A-practical-experience.html",
    "image": null,
    "date": "March 1, 2019",
    "category": "blog",
    "excerpt": "1st March, 2019 Our journey with the Data Binding library while building a large greenfield application. At Ostmodern, we build..."
},{
    "title": "Arsenal",
    "link": "/project/arsenal.html",
    "image": "../../assets/images/arsenal-video.png",
    "date": "February 25, 2019",
    "category": "project",
    "excerpt": "July 2018 - February 2019 Professional project The official Arsenal FC app. Supports live video streaming and audio commentary of..."
},{
    "title": "Nasa Astronomy Photo Of The Day",
    "link": "/project/nasa-astronomy-photo-of-the-day.html",
    "image": "../../assets/images/apod-list.png",
    "date": "November 10, 2018",
    "category": "project",
    "excerpt": "Personal project A Kotlin Android app demonstrating a modern architecture consisting of Kotlin, MVVM, RxJava, Koin, LiveData and lifecycle aware..."
},{
    "title": "Handling Gradle Dependencies In Modularised Android Projects",
    "link": "/blog/Handling-Gradle-dependencies-in-modularised-Android-projects.html",
    "image": null,
    "date": "October 28, 2018",
    "category": "blog",
    "excerpt": "28th October, 2018 How do I share dependencies between Android modules? With the benefits that modularised projects bring it would..."
},{
    "title": "Add Dagger To A Simple Android App",
    "link": "/blog/add-Dagger-to-a-simple-Android-app.html",
    "image": null,
    "date": "July 23, 2018",
    "category": "blog",
    "excerpt": "23rd July, 2018 A simple guide for adding Dagger2 to a modern MVVM Android project. Intro Dagger is always one..."
},{
    "title": "Formula 1 Tv",
    "link": "/project/formula-1-tv.html",
    "image": "../../assets/images/f1tv-current-season.png",
    "date": "July 1, 2018",
    "category": "project",
    "excerpt": "Professional project\n\nWatch live ad historic Formula 1 races, with live timings/leaderboard and multiple drive on-board cameras concurrently.\n\n\n\n"
},{
    "title": "Spotify Album Shuffle",
    "link": "/project/spotify-album-shuffle.html",
    "image": "../../assets/images/album-shuffle.png",
    "date": "July 1, 2018",
    "category": "project",
    "excerpt": "Personal project A music player, which uses the Spotify API to add functionality for playing a random album from your..."
},{
    "title": "Auto Generate Kotlin Android Documentation With Dokka",
    "link": "/blog/auto-generate-Kotlin-Android-documentation-with-Dokka.html",
    "image": null,
    "date": "June 26, 2018",
    "category": "blog",
    "excerpt": "22nd August, 2018 I’ve recently been trying to write better documentation, and after discovering how simple this was for Java..."
},{
    "title": "Birthday Reminder",
    "link": "/project/birthday-reminder.html",
    "image": "https://camo.githubusercontent.com/857b6f916e18665e46896d8013ac0259574efd79/687474703a2f2f692e696d6775722e636f6d2f7a63463258345a2e706e67",
    "date": "November 1, 2015",
    "category": "project",
    "excerpt": "Personal project Birthday reminder is a simple Material Design Android app which notifies users of upcoming birthdays. Released in 2015,..."
}]

$(document).ready(function() {
    $('#search-input').on('keyup', function () {
        var resultdiv = $('#results-container');
        if (!resultdiv.is(':visible'))
            resultdiv.show();
        var query = $(this).val();
        var result = index.search(query);
        resultdiv.empty();
        $('.show-results-count').text(result.length + ' Results');
        for (var item in result) {
            var ref = result[item].ref;
            var searchitem = '<li><a href="'+ hostname + store[ref].link+'">'+store[ref].title+'</a></li>';
            resultdiv.append(searchitem);
        }
    });
});