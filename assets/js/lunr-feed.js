var hostname = "https://julesssss.github.io";
var index = lunr(function () {
    this.field('title')
    this.field('content', {boost: 10})
    this.field('category')
    this.field('tags')
    this.ref('id')
});



    index.add({
      title: "Pears",
      category: null,
      content: "A banana is an edible fruit – botanically a berry – produced by several kinds\nof large herbaceous flowering plants in the genus Musa.\n\nIn some countries, bananas used for cooking may be called “plantains”,\ndistinguishing them from dessert bananas. The fruit is variable in size, color,\nand firmness, but is usually elongated and curved, with soft flesh rich in\nstarch covered with a rind, which may be green, yellow, red, purple, or brown\nwhen ripe.\n",
      tags: [],
      id: 0
    });
    

    index.add({
      title: "Apples",
      category: null,
      content: "A banana is an edible fruit – botanically a berry – produced by several kinds\nof large herbaceous flowering plants in the genus Musa.\n\nIn some countries, bananas used for cooking may be called “plantains”,\ndistinguishing them from dessert bananas. The fruit is variable in size, color,\nand firmness, but is usually elongated and curved, with soft flesh rich in\nstarch covered with a rind, which may be green, yellow, red, purple, or brown\nwhen ripe.\n",
      tags: [],
      id: 1
    });
    

    index.add({
      title: "Auto Generate Kotlin Android Documentation With Dokka",
      category: "kotlin",
      content: "\n\nI’ve recently been trying to write better documentation, and after discovering how simple this was for Java projects using Android Studio was upset to find out that this doesn’t work for Android projects written in Kotlin.\n\nUntil a couple of minutes later when I found Dokka, Jet-brain’s documentation engine for Kotlin. For anyone unlucky enough to not be completely free from Java, you’ll be pleased to know it also works with mixed Java/Kotlin projects.\n\nFor a sneak peak, here’s an example of Markdown documentation that I’ve generated from a simple project.\n\nPreconditions\n\nUnfortunately, good documentation doesn’t write itself, so the first step is to comment your code properly. Dokka will pick up comments from classes, methods and properties as well as highlighting param, return and other tag comments.\n\n&lt;iframe src=”https://medium.com/media/c6bf5ac69c3d3124834ec96a2f7add27” frameborder=0&gt;&lt;/iframe&gt;\n\nThankfully, that is the only precondition that’s necessary in order to use Dokka. Once we’ve setup the Dokka plugin and specified a few plugin preferences, we’ll be able to run a Gradle task which exports nicely organised, hyperlinked documentation in a couple of different formats. It’s that simple! Lets get started…\n\nPlugin Setup\n\nFor those with no patience, this commit shows the few necessary changes we need to make.\n\nFirst, in the project level build.gradle file, add the following classpath dependency (using a Dokka version variable if desired):\n    buildscript {\n\n        ext {\n            **dokkaVersion = '0.9.17'**\n        }\n\n        repositories {\n            jcenter()\n        }\n\n        dependencies {\n            **classpath \"org.jetbrains.dokka:dokka-android-gradle-plugin:$dokkaVersion\"**\n        }\n\n    }\n\nNow, for each module you would like to generate documentation for, add this plugin beneath the Kotlin kapt plugin in the **build.gradle **file. Followed by the a Dokka configuration block.\n\nThis will most likely be the **app **module build.gradle for single module projects.\n\napply plugin: 'kotlin-android-extensions'\napply plugin: 'kotlin-kapt'\n**apply plugin: 'org.jetbrains.dokka-android'**\n\n...\n\nandroid {\n\n    ...\n    **dokka {\n        outputFormat = 'html'\n        outputDirectory = \"$buildDir/javadoc\"\n    }**\n\n}\n\n\n\n  \n    **outputFormat: **We have a choice of 6 output formats including html, javadoc, and a few types of markdown.\n  \n  \n    **outputDirectory: **Choose the location you would like the documentation to be built to.\n  \n\n\nYou can find a list of all Dokka config options on the Documentation page, but here are a few useful examples to get you started:\n    // Do not output deprecated members\n    skipDeprecated = true\n\n    // Emit warnings about not documented members.\n    reportUndocumented = true\n\nBuilding the docs\n\nThat’s all! After syncing your project you should see a new Gradle task which will generate the documentation for you.\n\n\n\nRun the Gradle task from the Android Studio Gradle window or from the terminal with ./gradlew dokka, and navigate to the output directory you specified in the config. (You will need to switch to the Project view in order to see the output folder from within Android Studio).\n\nBy default, the above output directory will output docs to the ‘project &gt; app &gt; build &gt; javadoc &gt; app’ folder.\n\n\n\nOpen the index.html file in a browser and admire your new documentation, organised by package.\n\n\n\n\n\n![Here](https://github.com/Julesssss/Android-MVVM/blob/master/documentation/index.md) is an example of markdown formatted documentation hosted on a public GitHub repository\n\nNow we face the harder problem of getting people to actually read our docs!\n\nThanks for reading, please let me know if I’ve missed anything or if you have any tips for using Dokka!\n\nAlso,check out my latest post for help on managing dependencies in a multi-module project.\n",
      tags: [],
      id: 2
    });
    


var store = [{
    "title": "Pears",
    "link": "/pears.html",
    "image": null,
    "date": "August 22, 2018",
    "category": null,
    "excerpt": "A banana is an edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants..."
},{
    "title": "Apples",
    "link": "/apples.html",
    "image": null,
    "date": "August 21, 2018",
    "category": null,
    "excerpt": "A banana is an edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants..."
},{
    "title": "Auto Generate Kotlin Android Documentation With Dokka",
    "link": "/kotlin/auto-generate-Kotlin-Android-documentation-with-Dokka.html",
    "image": null,
    "date": "June 26, 2018",
    "category": "kotlin",
    "excerpt": "I’ve recently been trying to write better documentation, and after discovering how simple this was for Java projects using Android..."
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