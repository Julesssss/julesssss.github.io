var hostname = "https://julesssss.github.io";
var index = lunr(function () {
    this.field('title')
    this.field('content', {boost: 10})
    this.field('category')
    this.field('tags')
    this.ref('id')
});



    index.add({
      title: "Advanced Bash / Zsh",
      category: null,
      content: "General, useful things\ncurl cheat.sh/command_to_search shows a cheatsheet with options for this command\n\n(move this into another post. I don’t use it often enough)\nfile_or_command | tee filename It takes an input, outputs it into the console and at the same time saves it into a file.\n\nProcessing files and data\n\n  find . -iname \"*file_to_search*\" search something at current directory\n  locate file_to_search search through whole computer\n  rg general searching through data files. Better than grep -r\n  diff -y --suppress-common-lines file1 file2 | grep '^' | wc -l count number of changes between 2 files\n\n\n\nAnalyze logs in real time\nWith less +F we can inspect the file, stop to read and resume in real time.\nThe advantage over tail -f is, with the former we can inspect the logs, but if there’s an error or something we want to stop and see, we have to exit and cat or vim the file.\nless +F file_to_inspect # real time\nctrl + c # stops\nshift + F # resumes\n\n\nDiscard normal &amp; error output of a command\n&gt; /dev/null Redirects standard output to /dev/null\n2&gt;&amp;1 redirects error output to same as standard output\ncommand_to_execute &gt; /dev/null 2&gt;&amp;1\n\n\nVim\nRedirect input into a Vim buffer\ninput | vim - This, run from bash, outputs the result of a command or a file into a vim buffer, where we can do whatever with it, without modifying the original source.\n\nUseful vim commands\nAll of this are executed in command mode\n\n:w filename - writes the content into a file with the following name\n:%! grep -v delete-this - execute bash commands for our file content. This example will delete all the lines from our file, which contain the String delete-this.\n:%s/originalstring/replacement/gc - replaces originalstring for replacement. g is do this for all matches. c is interactive.\n:set rnu - see relative line numbers. :set rnu! turns off.\n\nDelete something\n:-6-4d deletes from the relative line -6 to -4\n\nThis commands may be run with c instead of d, and it will do the same, and open insert mode directly  \ndi\" when run inside two \" it will delete the content between them.\ndt. delete from my position until the next .\ndf. delete from my position until, and including, the next .\n\nSearch for something\nf - find and travel to next ocurrence. For example f. searches for the next .\n\n/whatever - searches for the string in the documment. Forward search\n?whatever - reverse search. n will now search back\n\nshift + n n - go to previous / next match\nggn Gn - go to first / last match\n* # - searches for next / previous ocurrence of current word\n\nCopy and paste\n:-6,-4co. copies from the relative lines -6 to -4 into your current position\n\nshift + v select whole lines\ny / d copy / cut\nP / p paste before / after the cursor\n\nMisc\n:set nu - see line numbers, :set nu! turns them off\n\nVimdiff\nUseful to compare changes between up to 4 files at once. It uses the same commands as vim.\n\nctrl + w direction arrow moves the cursor in between file windows\n:qa quit all windows without saving\n:wqa same but saving\n\nAwk\nLanguage processor. Useful to process .csv or files which are structured by columns. By default, it separates columns by whitespaces.\n\nChange line-separator\nawk -F '\\t' '{print}' file.txt Uses tabs instead of spaces as separator.\n\nWorking with filters\nawk '$19 == \"S\"' file.txt show lines where the column #19 is equal to S\nawk -F '\\t' '$2 == \"18249\"' file.txt uses both a filter and another line separator at the same time\n\nawk '{print $4}' file.txt | sort | uniq print duplicates entries only once\nawk -F '\\t' '$2 == \"18249\" || $2 == \"18258\"' file.txt one condition or the other\n\nWorking with columns\nawk '{print $4}' file.txt Prints only column #4\nawk '{print NR, $4}' file.txt Print only column #4 with line number\nawk 'length($2) &gt; 0' file.txt print lines, where the second column has a length greater than 0.\n\nRegex\nawk '$2 ~ /^[0-9]+$/' fichero.txt get columns for which the following regex is true\n!~ regex negation\n\nReference(s)\nhttps://github.com/jlevy/the-art-of-command-line?utm_campaign=explore-email&amp;utm_medium=email&amp;utm_source=newsletter&amp;utm_term=weekly\nhttps://www.youtube.com/watch?v=l8iXMgk2nnY\nhttps://www.youtube.com/watch?v=1alWK5ByNMc\n",
      tags: [],
      id: 0
    });
    

    index.add({
      title: "Kotlin experience cheat-sheet",
      category: null,
      content: "Mutable vs Inmutable collections\nKotlin’s List from the standard library is readonly. This means if we use collections from Java Libraries such as Spring Data / JPA, the List we are going to get back is not the same as a Kotlin List but a MutableIterable&lt;&gt; interface.\nThis is an example on how to mock and inject a Java List in a Kotlin test.\nval courses = mutableListOf&lt;Course&gt;()\nevery { dao.findAll() } returns courses\n\n\nSpring Dependency Injection\nThis is the equivalent to constructor DI with @Autowired for the bean Service into RestResource\nclass RestResource(private val service: Service) {\n  // whatever\n}\n\n\n\n\nBean with automatically given ID\nExample of a bean with an automatically given ID by Hibernate, primary and secondary constructors\n@Entity\n@Table(name = \"course\")\nclass Course(\n        @Id\n        @GeneratedValue(\n        strategy = GenerationType.IDENTITY)\n        val id: Long? = null,\n        var username: String,\n        var description: String) {\n\n    constructor() :\n            this(username = \"\",\n            description = \"\")\n\n    constructor(username: String,\n                description: String) :\n            this(null,\n            username = username,\n            description = description)\n}\n\n\nTesting\nIt’s possible to use the same libraries and dependencies as with Java to transition slowly into Kotlin’s style. It uses JUnit 5. Also MockK instead of Mockito\n\nKotlin has it’s own testing dependency to add to the pom.\n&lt;dependency&gt;\n    &lt;groupId&gt;org.jetbrains.kotlin&lt;/groupId&gt;\n    &lt;artifactId&gt;kotlin-test&lt;/artifactId&gt;\n    &lt;version&gt;check_last_version&lt;/version&gt;\n    &lt;scope&gt;test&lt;/scope&gt;\n&lt;/dependency&gt;\n\n\nTest template\n@ExtendWith(MockKExtension::class)\ninternal class RestResourceTest {\n\n  @MockK\n  lateinit var service: Service\n\n  @InjectMockKs\n  lateinit var resource: Resource\n\n  @Test\n  internal fun testXXX() {\n    // Given\n\n    // When  \n\n    // Then  \n\n  }\n\n}\n\n\nMocking\nSame as BDDMockito.given(personDao.findOne(id)).willReturn(person)\nval id = 123L\nval person = Person()  \nevery { personDao.findOne(id) } returns person\n\n\nVerify method\nSame as BDDMockito.verify(personDao).findOne(id)\nverify { personDao.findOne(id) }\n\n\nAssert Exception\nThis needs the artifact kotlin-test at the POM.\nassertFailsWith&lt;Exception&gt;(\"message\") {\n  this.restResource.getCourse(id)\n}\n\n",
      tags: [],
      id: 1
    });
    

    index.add({
      title: "Spring CORS",
      category: null,
      content: "CORS (Cross-Origin Resource Sharing)\nIt’s a mechanism to let a web application running at one domain, protocol or port have permission to access resources from a server at a different one.\n\nThis is needed if you have, for example, a Frontend running on port :3000 (React) consuming a Backend API running on port :34831 (custom port for Spring). Unless CORS are set, FE will not be able to access BE resources.\n\nIn Spring\nIt’s possible to enable them for a single RestResource or globally for the whole application.\n\n(This example has been done in Kotlin)\n\nBy RestResource\n@RestController\n@RequestMapping(\"courses\")\n@CrossOrigin(\"http://localhost:3000\")\nclass CourseRestResource {\n  // dependencies and methods\n}\n\n\n\n\nGlobally\nThis is done at a SpringConfig level, creating a new @Bean as follows.\n\n@Configuration\n@ComponentScan(basePackages = [\"redacted\"])\nclass SpringConfig {\n\n  @Bean\n  fun corsFilter(): CorsFilter {\n    val origin = \"http://localhost:3000\"\n    val headers = listOf(\"Origin\", \"Content-Type\", \"Accept\")\n    val methods = listOf(\"GET\", \"POST\", \"PUT\", \"OPTIONS\", \"DELETE\")\n    val source = UrlBasedCorsConfigurationSource()\n    val config = CorsConfiguration()\n    config.allowCredentials = true\n    config.allowedOrigins = Collections.singletonList(origin)\n    config.allowedHeaders = headers\n    config.allowedMethods = methods\n    source.registerCorsConfiguration(\"/**\", config)\n    return CorsFilter(source)\n  }\n\n}\n\n\nResource(s)\nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/CORS\nhttps://stackoverflow.com/questions/51720552/enabling-cors-globally-in-spring-boot\n",
      tags: [],
      id: 2
    });
    

    index.add({
      title: "ReactJS",
      category: null,
      content: "JavaScript library for building user interfaces. Created by Facebook.\n\nYarn\nJavaScript package manager compatible with npm that helps automate the process of installing, updating, configuring, and removing npm packages.\n\nInstall on Ubuntu\n# add Yarn repository\ncurl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -  \n\necho \"deb https://dl.yarnpkg.com/debian/ stable main\" | sudo tee /etc/apt/sources.list.d/yarn.list  \n\nsudo apt-get update  \nsudo apt-get install yarn  \nyarn --version # verify\n\n\nCreate React Project\n\n  yarn create react-app my-react-app-name creates a template\n  yarn start starts the development server\n  yarn build bundles the app into static files for prod\n  yarn test  starts the test runner\n\n\nReact Components\nThey let you split the UI into dependant, reusable pieces. They must always start with a capital letter. Components may refer to other components in their output.\n\nTry to split them into standalone units, as small as possible, as this does code more reusable in larger apps.\n\nDeclaration as a .jsx file\nclass HelloWorld extends React.Component {\n  render() {\n    return &lt;h1&gt;Hello World!&lt;/h1&gt;\n  }\n}\n\nexport default HelloWorld\n\n\nrender() returns what needs to be displayed as part of the component.\n\nexport default HelloWorld Each JS file is a module. If you want elements from one module to be used in another, you need to export them.\n\nUsage of our custom component\nclass App extends Component {\n  render() {\n    return (\n      &lt;div className=\"App\"&gt;\n          &lt;HelloWorld/&gt;\n      &lt;/div&gt;\n    );\n  }\n}\n\n\nImportant Methods\ncomponentDidMount() React defines a lifecycle for its components. This method will be called as soon as the component is mounted.\n\nFormik\nReact component to build forms\n\nFormik does not (re)load a parameter\nCheck if at &lt;Formik&gt; tag the following flag has been enabled enableReinitialize={true}. The reason is that the render() method may render it once empty, and the second time it wouldn’t load.\n\nThe start tag should look as follows\n\n&lt;Formik\n    enableReinitialize={true}\n    initialValues=&gt;\n\n\nReference(s)\nhttps://www.springboottutorial.com/spring-boot-react-full-stack-crud-maven-application\nhttps://reactjs.org/docs/components-and-props.html\n",
      tags: [],
      id: 3
    });
    

    index.add({
      title: "Git CLI",
      category: null,
      content: "Config\n\n  see config git config -l\n  modify username git config --global user.name \"newName\"\n  modify email git config --global user.mail \"new@mail.com\"\n\n\nGit bisect\nIs a tool to find the exact commit where a bug was introduced.\n\nUsage\nI have a file with the following content and an obvious bug\nRow row row your car at the river\n\n\nThis is the git history\n\n  master - added word river\n  changed word boat for cat\n  added word the\n  added word at\n  added word boat\n  added word your\n  added third row\n  added second row\n  added word row\n  Initial commit\n\n\nWe need to select a good and a bad commit. We’ll select the last one as bad because the bug is there, and as good the first one.\n\ngit bisect good 6f47e638a6bc5f4210218d77f1c43e34cc16470c  \ngit bisect bad 8a2d118528471d48d87942b8097093dd04476b25\n\n\nThen it’s going to navigate the commit history, changing the actual commit, and we have to check the file and indicate if it’s still good or it already contains the bug. We do so with\n\ngit bisect good\ngit bisect bad\n\n\nAt the end of all, it tell us the exact commit where the bug was introduced\ncff142cdac62f6845d69ea4694c4c5e6606f2294 is the first bad commit\ncommit cff142cdac62f6845d69ea4694c4c5e6606f2294\nAuthor: Mario Codes &lt;xxx&gt;\nDate:   Mon Jul 8 16:06:33 2019 +0200\n\n    changed word boat for car\n\n\nAnd we have to exit it with\ngit bisect reset\n\n\nReference(s)\nhttps://git-scm.com/docs/git-bisect\nhttps://www.metaltoad.com/blog/beginners-guide-git-bisect-process-elimination\n",
      tags: [],
      id: 4
    });
    

    index.add({
      title: "From Java to Kotlin (2/2) - Idioms",
      category: null,
      content: "Kotlin’s has built-in support for common java patterns. This are some of them.\n\nCreate POJOs (Plain Old Java Object)\nThis provides the class with getters (and setters for vars) as also .toString(),\n equals(), copy() etc.\ndata class Person(val name: String, var age: Int)\n\n\nParams with default values\nIt’s possible to give default values to parameters\nfun default(arg1: Int = 0, arg2: String = \"oh no\") {\n  // whatever\n}\n\n\nFilter a list\nfun filterPositives() {\n  val list = listOf(-2, -1, 0, 1, 2)\n  val positives = list.filter(x -&gt; x &gt; 0)\n}\n\n\nCheck is class instanceOf()\nfun isInstanceOf(obj: Any) {\n    when(obj) {\n        is String -&gt; \"str\"\n        is Integer -&gt; \"int\"\n        else -&gt; \"whatever\"\n    }\n}\n\n\nRanges usage\nfun ranges(value: Int) {\n\n    // includes 10\n    for(i in 1..10) {}\n\n    // does not include 10  \n    for(i in 1 until 10) {}\n\n    // goes in steps of i+=2\n    for (i in 2..10 step 2) {}\n\n    // from 10 to 1, both included\n    for (i in 10 downTo 1) {}\n\n    if(value in 1..10) {}\n\n}\n\n\nLazy property\nval p: String by lazy {\n    \"compute the String here\"\n}\n\n\nExecute if not null / else\nfun executeIfNotNull(str: String?) {\n    str?.let {\n        println(\"is not null!\")\n    }\n}\n\nfun ifNotNullElse() {\n    val files = File(\"test\").listFiles()\n    println(files?.size ?: \"empty\")\n}\n\n\nGet first item of possibly empty collection\nfun getFirstItem() {\n    val emails = emptyList&lt;String&gt;()\n    val mainEmail = emails.firstOrNull() ?: \"\"\n}\n\n\nConsume a nullable Boolean\nval b: Boolean? = ...\nif(b == true) {\n\n} else {\n  // b is false or null\n}\n\n\nReference(s)\nhttps://kotlinlang.org/docs/reference/idioms.html\n",
      tags: [],
      id: 5
    });
    

    index.add({
      title: "From Java to Kotlin (1/2) - Basic Syntax",
      category: null,
      content: "Guide on differences to jump from Java developer to Kotlin developer.\n\nClass instantiation\nNo new operator is needed\n  class Whatever {\n      fun createClass() {\n        val person = Person()\n      }    \n  }\n\n\nFunction declaration\nTwo Int parameters and an Int return value\nfun sum(arg1: Int, arg2: Int): Int {\n  return arg1 + arg2\n}\n\n\nThe return value may be inferred and the function used as an expression\nfun sum(arg1: Int, arg2: Int) = arg1 + arg2\n\n\nVariables\nThere’re 2 types of variables val and var. The first is a read-only variable and the former may be re-assigned.\nfun variables() {\n  val readOnly: Int = 1 // type assigned on declaration\n  var normalVariable = 2 // type inferred\n}\n\n\nString templates\nStrings are more powerful than on Java\nvar a = 1\nval string1 = \"a is $a\"\n// would print \"a is 1\"\n\na = 2\nval string2 = \"${string1. replace(\"is, \"was)}, but now is $a\"\n// would print \"a was 1, but now is 2\"\n\n\nNull Safety\nKotlin differences between nullable and non-nullable references\nvar nonNullable: String = \"Hello world\"\nnonNullable = null // compilation error\n\nvar nullable: String? = \"Hello world\"\nnullable = null // okay\n\n\nFor more information about this, search for my Kotlin - null safety post.\n\n‘Is’ operator\nChecks the type of a variable\nif (obj !is String)\n  return null\nelse\n  return obj.length // automatic cast to string\n\n\nExpressions\n‘When’ expression\nIs similar to Java’s switch\nfun whenExpression(obj: Any): String =\n  when(obj) {\n    1 -&gt; \"one\"\n    \"hello\" -&gt; \"greeting\"\n    is Long -&gt; \"Long\"\n    else -&gt; \"anything\"\n  }\n\n\nConditional expressions\nJust as methods, conditionals may be used as expressions\nfun cond(a: Int, b: Int) = if(a &gt; b) a else b\n\n\n‘If’ expression\nfun ifExpression(arg1: Int) {\n    val result = if(arg1 == 1) {\n        \"one\"\n    } else if(arg1 == 2) {\n        \"two\"\n    } else {\n        \"three\"\n    }\n}\n\n\n‘Try/catch’ expression\nfun tryCatchExpression(arg1: Int) {\n    val result = try {\n        arg1 / 0\n    } catch (ex: ArithmeticException) {\n        throw IllegalStateException(ex)\n    }\n}\n\n\nReference(s)\nhttps://kotlinlang.org/docs/reference/basic-syntax.html\n",
      tags: [],
      id: 6
    });
    

    index.add({
      title: "Generate a builder with Lombok",
      category: null,
      content: "Is possible to auto-generate builders for a Java class using @Builder lombok annotation. They’re really simple though and do not provide auto-filling. They just create an API to fill them with test data.\n\nAll we need is to put the annotation into a Java class\n@Builder\n@Getter\n@Setter\n@NoArgsConstructor\n@AllArgsConstructor\npublic class PersonDto {\n\n  private long id;\n\n  private String name;\n  private int age;\n\n  @Singular\n  private Set&lt;String&gt; hobbies;\n\n}\n\n\n\n\nThis provides the basic API to use them as follows\n\npublic class Whatever {\n\n  public PersonDto buildPerson() {\n    return PersonDto.builder().age(18)\n                              .hobby(\"live\")\n                              .name(\"Sergey\")\n                              .id(11235434L)\n                              .build();\n  }\n\n}  \n\n\nThe @Singular annotation is given to Collections and it adds a couple of methods. One to add a single Object, another to add Collections of Objects and a third one to clear all.\n\nReference(s)\nhttps://www.projectlombok.org/features/Builder\n",
      tags: [],
      id: 7
    });
    

    index.add({
      title: "How to link an intermediary table",
      category: null,
      content: "(This was done with MySQL, Hibernate and Lombok)\n\nSetting: We have two Entities, Category and Code. Some categories must contain x codes, others cannot contain y codes and we want to leave open the possibility to “must contain z but not p” at the same time.\n\nHow: At database level we’ll have 4 tables with the following structure\n\nclient_category\n\n\n  \n    \n      FIELD_NAME\n      FIELD_TYPE\n      CONSTRAINTS\n    \n  \n  \n    \n      id\n      bigint(19)\n      PK (primary key)\n    \n    \n      example_string\n      varchar(255)\n       \n    \n    \n      example_bool\n      tinyint(1)\n       \n    \n  \n\n\n\n\nclient_code\n\n\n  \n    \n      FIELD_NAME\n      FIELD_TYPE\n      CONSTRAINTS\n    \n  \n  \n    \n      id\n      bigint(19)\n      PK\n    \n    \n      value\n      varchar(255)\n       \n    \n  \n\n\nclient_category_contains_code\n\n\n  \n    \n      FIELD_NAME\n      FIELD_TYPE\n      CONSTRAINTS\n    \n  \n  \n    \n      id\n      bigint(19)\n      PK\n    \n    \n      client_category_pk\n      bigint(19)\n      FK_client_category_contains_code\n    \n    \n      client_code_pk\n      bigint(19)\n      FK_client_code_contains_code\n    \n  \n\n\nclient_category_does_not_contain_code\n\n\n  \n    \n      FIELD_NAME\n      FIELD_TYPE\n      CONSTRAINTS\n    \n  \n  \n    \n      id\n      bigint(19)\n      PK\n    \n    \n      client_category_pk\n      bigint(19)\n      FK_client_category_does_not_contain_code\n    \n    \n      client_code_pk\n      bigint(19)\n      FK_client_code_does_not_contain_code\n    \n  \n\n\nThe FKs (foreign keys) of the last two tables point to the PKs of client_category and client_code respectively. Important to be able to create this constraints is that they are the same type and have the same length.\n\nThis are the Java classes, representation of our Entities:\n\n@Entity\n@Getter\n@Setter\n@Table(name = \"client_code\")\npublic class ClientCode {\n\n  @Id\n  @GeneratedValue(strategy =\n    GenerationType.IDENTITY)\n  private Long id;\n\n  @Column(name = \"value\")\n  private String value;\n\n}\n\n\n@Entity\n@Getter\n@Setter\n@Table(name = \"client_category\")\npublic class ClientCategory {\n\n  @Id\n  @GeneratedValue(strategy =\n    GenerationType.IDENTITY)\n  private Long id;\n\n  @Column(name = \"example_string\")\n  private String exampleString;\n\n  @Column(name = \"example_bool\")\n  private Boolean exampleBool;\n\n  @OneToMany(fetch = FetchType.EAGER)\n  @JoinTable(name =\n    \"client_category_contains_code\",\n    joinColumns =\n      @JoinColumn(name = \"client_category_pk\",\n                  referencedColumnName = \"id\"),\n    inverseJoinColumns =\n      @JoinColumn(name = \"client_code_pk\",\n                  referencedColumnName = \"id\"))\n  private Set&lt;ClientCode&gt; containsCode;\n\n  @OneToMany(fetch = FetchType.EAGER)\n  @JoinTable(name =\n    \"client_category_does_not_contain_code\",\n    joinColumns =\n      @JoinColumn(name = \"client_category_pk\",\n                  referencedColumnName = \"id\"),\n    inverseJoinColumns =\n      @JoinColumn(name = \"client_code_pk\",\n                  referencedColumnName = \"id\"))  \n  private Set&lt;ClientCode&gt; doesNotContainCode;\n\n}\n\n\nThe connection between tables at Java is built through javax annotations. This way, when we use our DAOs to retrieve a ClientCategory, Hibernate will automatically retrieve all the ClientCode and populate them into the appropiate Set&lt;ClientCode&gt;.\n",
      tags: [],
      id: 8
    });
    

    index.add({
      title: "Java experience cheat-sheet",
      category: null,
      content: "Read files &gt; 1 GB lazily\nThis reads big files (&gt;200 MBs) sequentially and without loading the whole File in memory. This way we’re able to read text files on the Gigabyte level. This example was done reading from a remote SFTP server.\n\nfinal ChannelSftp sftpClient = this.connect();\nfinal InputStream is = sftpClient.get(file);\nfinal InputStreamReader isReader\n      = new InputStreamReader(is);  \n\ntry (final BufferedReader bffReader  \n      = new BufferedReader(isReader)) {\n  bffReader.lines()\n        .forEach(this::doAction);\n} catch(final IOException ex) {\n  log.error(\"bla\", ex);\n}\n\n\nOperate a Stream in batches\n(This solution uses Google Guava)\n\nI have a really big List&lt;Object&gt; with f.e. 600.000 entries and I’d like to be able to operate them in batches of n size.\npublic void handle() {\n  final int batchSize = 100; // n\n  final List&lt;MyEntity&gt; list = this.dao.findAll();\n  Iterators.partition(list.iterator(), batchSize)\n           .forEachRemaining(this::consumer);  \n}\n\nprivate void consumer(final List&lt;MyEntity&gt; batch) {\n  // this will contain 100 Entities\n  // do x\n}\n\n\nReference(s)\nhttps://stackoverflow.com/questions/30641383/java-8-stream-with-batch-processing\n\nIterate, operate and delete from a single List\nThis has the benefit we don’t need to create another List to contain the result of our operation. It comes really handy when we’ve to operate big Lists of items (+500.000) and we’re already near the limit of our VM.\n/**\n * @param originalItems\n *          huge list\n * @param filteredItems\n *          map to filter them into\n */\nprivate void filterAndRemove(\n      final List&lt;TYPE&gt; originalItems,\n      final Map&lt;String, List&lt;TYPE&gt;&gt; filteredItems)\n{\n  final ListIterator&lt;TYPE&gt; origIterator =\n      originalItems.listIterator();\n  for (int idx = 0; origIterator.hasNext(); idx++)\n  {\n    final TYPE item = origIterator.next();\n    final String key = this.buildKey(item);\n    filteredItems.put(key, item);\n    origIterator.remove();\n    this.clearMemoryEvery(idx, 1000);\n  }\n}\n\n\nConvert checked into unchecked exception\n(Test example in private Repo)\n\nUse Unchecked.consumer()\n\nprivate OrderRepo repo;\n\npublic File exportFile(String fileName) {\n  File file = new File(\"export/\" + fileName);\n  try (Writer writer = new FileWriter(file)) {\n    writer.write(\"ID;Date\\n\");\n    repo.findByActiveTrue()\n    .map(o -&gt; o.getId() + \";\"\n    \t+ o.getCreationDate())\n    .forEach(Unchecked.consumer(writer::write));\n  }\n}\n\n\nReference\nConference (18:45)\n\nTime\nObtain last day of a month\n(This uses Java8 Time API)\n\nfinal LocalDate invoiceDate =  \n\t\tposition.getReferenceDate();\nfinal int month = invoiceDate.getMonthValue();\nfinal int year = invoiceDate.getYear();\nfinal YearMonth yearMonth =   \n\t\tYearMonth.of(year, month);\nfinal int lastDayOfMonth =   \n\t\tyearMonth.lengthOfMonth();\n\n\nMock LocalDate.now()\nThe key is to give a fixed clock to LocalDate (Java 8).\nFirst of all we prepare the real clock to be injected.\n\n// This goes into our Spring's config class.\n@Bean\npublic Clock clock() {\n  return Clock.systemDefaultZone();\n}\n\n\nWe inject and use it\n\n@Component\npublic class Whatever {\n\n  @Autowired\n  private Clock clock;\n\n  public LocalDate obtainDate() {\n    return LocalDate.now(clock);\n  }\n\n}\n\n\nAnd inside the test class, we can just mock it\n\n@Test\npublic void testLocalDate() {\n  // Given\n  final String date = \"2019-07-03\";\n  final DateTimeFormatter formatter =\n    DateTimeFormatter.ofPattern(\"yyyy-MM-dd\");\n  final LocalDateTime dateTime =\n    LocalDateTime.parse(date, formatter);\n\n  final Clock fixedClock = Clock.fixed(  \n    dateTime.atStartOfDay(ZoneId.systemDefault()).toInstant(),  \n    ZoneId.systemDefault());\n\n  // the clock is now ready to be injected and / or used\n\n  // When\n  // Then\n}\n\n\nReference(s)\nhttps://stackoverflow.com/questions/22463062/how-to-parse-format-dates-with-localdatetime-java-8\nhttps://stackoverflow.com/questions/32792000/how-can-i-mock-java-time-localdate-now\n\nTesting\nInject SpringContext into IT (JUnit)\n\nTo inject Spring’s context into an Integration-Test. Instead of @RunWith(…) [JUnit]\n\n@ContextConfiguration(classes = { SpringConfig.class })\npublic class testIT extends AbstractTestNGSpringContextTests {\n\n\t@Autowired\n\tprivate Object whatever;\n\n\t...\n}\n\n\nBDDAssertions\n(This uses BDDCatchException, Mockito and AssertJ)\n\nMock an exception, which will be thrown and caught\n\n// Given\nBDDMockito.given(mock.method())  \n\t\t.willThrow(Exception.class);\n\n// When\nBDDCatchException.when(mainTestedClass).method();\n\n// Then\nBDDAssertions  \n.assertThat(BDDCatchException.caughtException())  \n.isNull();\n\n\nTest an exception is thrown:\n\n// Given\nCrudService service = new CrudService() {};\nString userName = \"admin\";\n\n// When\nBDDCatchException.when(service)  \n.methodToExecute(userName);\n\n// Then\nBDDAssertions  \n.then(BDDCatchException.caughtException())  \n.isInstanceOf(NameOfExpectedException.class);\n\n\nTest no exception is thrown:\n\n...\n// Then  \nBDDAssertions  \n.then(BDDCatchException.caughtException())  \n.isNull();\n\n\nInject mock into ‘new’ operator\n\n// Real class  \nprotected JSch createStubInstance() {\n\tneturn new JSch();\n}\n\n// Test class  \n@Test\npublic void testWhatever() {  \n  JSch jschMock = Mockito.mock(JSch.class);  \n\n  BDDMockito.given(realClass.createStubInstance())  \n\t.willReturn(jschMock);\n}\n\n\nJavadoc\nLink javadoc to a method of the same class\n\n/*\n* This method does the same as\n* {@link #escape(Parameters) escape}\n* but with lists\n*/\n\n\nSpring\nClean Dirty context\nWhen we use Spring’s DI in an integration test, the context may be dirty between every test and must be cleaned. This is done with @DirtiesContext tag.\n\n@RunWith(SpringJUnit4ClassRunner.class)  \n@ContextConfiguration(classes =  \n\t{ CoreConfig.class })  \n@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)  \npublic class ASCIISystemIT { ... }  \n\n\nIntelliJ\nMaven builds, but IntelliJ doesn’t find imports\n\n  From IntelliJ execute a mvn clean install\n  Execute maven goal -&gt; mvn dependency:purge-local-repository\n  Build -&gt; Rebuild project\n\n\nReference(s)\nhttps://stackoverflow.com/questions/37581523/maven-doesnt-find-dependency\n",
      tags: [],
      id: 9
    });
    

    index.add({
      title: "MySQL User Privileges",
      category: null,
      content: "How to grant privileges for a database to a user, when both already exist.\n\nIn this case the database name will be project_node1, the user project_user and the password project_pass. All the following commands have to be executed as root or with a user with enough privileges.\n\n-- list system users\nSELECT user, host FROM mysql.user;\n\n-- see current privileges\nSHOW GRANTS FOR 'project_user'@'%';\n\n-- delete all previous privileges (if needed)\n-- REVOKE ALL PRIVILEGES ON `project_node1`.* FROM 'project_user'@'%';\n\n-- grant new privileges and flush\nGRANT ALL PRIVILEGES ON `project_node1`.* TO 'project_user'@'%';\nFLUSH PRIVILEGES;\n\n\nReference(s)\nhttps://serverfault.com/questions/115950/how-do-i-change-the-privileges-for-mysql-user-that-is-already-created\n",
      tags: [],
      id: 10
    });
    

    index.add({
      title: "Kotlin - null safety",
      category: null,
      content: "Kotlin differences between nullable and non-nullable references\nvar nonNullable: String = \"Hello World\"\nnonNullable = null // compilation error\n\nvar nullable: String? = \"This is nullable!\"\nnullable = null // okay\n\n\nAs this is the case, you cannot assign a nullable variable to a non-nullable variable directly. You have to assign first a default value which will be used in case the nullable variable is null. This is done through the Elvis operator.\n\nvar nullable: String? = \"This is nullable\"\nvar newNonNullable: String = nullable ?: \"default value\"\n\n\nIt also has a safe call operator to avoid methods being called on null references.\n\nvar nullable: String? = \"This is nullable\"\nvar parsed: Int? = nullable?.length // 16\n\nnullable = null\nparsed = nullable?.length // nullable.length is never called, and parsed is set to null\n\n\nReference(s)\nhttps://blog.scottlogic.com/2019/04/29/kotlin-vs-java.html\n",
      tags: [],
      id: 11
    });
    

    index.add({
      title: "Docker usage",
      category: null,
      content: "Definitions\n\nImage Executable package that includes everything needed to run an application.\nContainer Instance of an image.\n\nStack Defines the interaction of all the services\nServices Defines how containers behave in production\n\nDockerFile  File which allows us to build upon an already existing image. It defines the base image to build from, our own files to use / append into this image, and the commands to run. At the end, a DockerFile will only be a service, which we will call from docker-compose.\n\nDocker vs docker-compose\nDocker is used when managing a single individual container. docker-compose is used to manage a multi-container application or it may also be used as support to input large customization options, for a single-container app, which otherwise would be needed to input as a parameters in a one-liner.\n\nDocker-compose also moves many of the options you would enter on the docker run cli into the docker-compose.yml file for easier reuse. It works as a “frontend script” on top of the same docker api used by docker, so you can do everything docker-compose does with docker commands and a lot of shell scripting.\n\nVolumes They are the preferred mechanism to persist data, as docker manages them itself, they do not increment the size of the container using them and the contents of the volume exist outside of the life cicle of a container. They’re not suitable to write temporal information.\n\nReference(s)\nhttps://stackoverflow.com/questions/37966552/what-is-the-difference-between-docker-and-docker-compose\nhttps://docs.docker.com/storage/volumes/\n\nRun without sudo\nIt’s needed to add your user to the docker group\n\nsudo groupadd docker\nsudo gpasswd -a {$USER} docker\n# log-out and -in\n\n\nDocker (single-container, local)\nDockerFile\nMySQL database service:\nFROM mysql:5.6.23\n\nENV MYSQL_DATABASE project\nENV MYSQL_ROOT_PASSWORD root\nENV MYSQL_USER root\nENV MYSQL_ALLOW_EMPTY_PASSWORD yes\n\nCOPY db.sql /docker-entrypoint-initdb.d/db.sql\nCOPY my.cnf /etc/mysql/my.conf\n\nRUN /entrypoint.sh mysqld &amp; sleep 10\nRUN rm /docker-entrypoint-initdb.d/db.sql\n\n\nThe commands to run and the needs of every image will be unique. Check at the official image doc.\n\nCheck installation\ndocker --version\ndocker info\ndocker version\ndocker run hello-world\n\n\nAdministration\nSystem\n\n  docker {$command} --help show possible options for a command\n  docker system prune general clean (delete all containers, cache, images etc)\n  docker stop {$CONTAINER_ID} | xargs docker rm stop and delete a container in a one-liner\n\n\nDockerFile\n\n  docker build -t {$image_name} -f {$docker_file_name} . build image from DockerFile\n\n\nImages\n\n  docker images list images\n  docker rmi {$image_id} remove image\n    \n      -f force remove\n    \n  \n  docker run -d {$IMAGE_ID} run image as a container, daemon mode\n  docker run -it {$IMAGE_ID} /bin/bash run image as a container, interactive mode\n  docker run -p {$REAL_PORT}:{$IMAGE_PORT} {$IMAGE_ID} run image, map ports\n    \n      --rm the container will delete itself when stopped.\n      --name {$NAME} name which will be given to the container\n      --mount source={$VOLUME_NAME},target={$PATH_IN_CONTAINER} give a specific volume to use\n    \n  \n\n\n# Create a volume named \"ohno\"\ndocker volume create ohno\n# Creates a container of an image, in interactive mode, which will have access\n#   to the \"ohno\" volume every time it's started.\ndocker run -it --name=volumetest --mount source=ohno,target=/app ubuntu:latest\n\n\nExamples\nExamples ready with the real, binded parameters the apps need. Only run once and from then on just start the container.\n# Mongo container with a persisted volume binded to mongo folder and maps the port\ndocker run -d --name mongo_werder --mount source=mongo_werder,target=/data/db -p 27017:27017 mongoclient/mongoclient:latest\n\n# Portainer\ndocker run -dp 9000:9000 -v \"/var/run/docker.sock:/var/run/docker.sock\" --name 'portainer' portainer/portainer\n\n\nContainers\n\n  docker ps list only running containers\n    \n      -a all containers, even stopped\n    \n  \n  docker stop {$container_id} stop a container\n  docker container prune delete all the stopped containers\n  docker rm {$id} delete a container\n\n\nVolumes\n\n  docker volume create {$name} create a new volume\n  docker volume ls list\n  docker volume inspect {$volume_id} see a volume’s details\n  docker volume rm {$volume_id} delete\n\n\nDockerHub (Remote)\nExternal repositories\n\n  docker login log-in in DockerHub\n  \n    docker login -u msanchez {$repository} log-in in private repository\n  \n  docker search {$thing_to_search} explore hub repositories\n  docker pull {$thing}:latest\n  docker run {$thing}:latest\n\n\nOwn repositories\n\n  docker tag {$image_name} {$username}/{$repository}:{$tag} tag an image\n    docker tag friendlyhello mariocodes/ubuntu-notes:first-tag\n    \n  \n  docker push {$username}/{$repository}:{$tag} publish an image\n  docker run {$username}/{$repository}:{$tag} run remote image\n\n\nReference(s)\nhttps://cloud.docker.com/\nhttps://hub.docker.com/search/?q=&amp;type=image\n\nDocker compose\nAdministration\n\n  docker-compose ps list running, docker-compose containers\n  docker-compose run &lt;service&gt; &lt;process&gt; run a process in a specific container service\n    docker-compose run php bash\n    \n  \n\n\nContainers\n\n  docker-compose up --build -d start container as daemon\n    \n      --build starts it with rebuild\n    \n  \n  docker-compose stop stop containers, gracefully\n  docker-compose kill stop containers, brute force\n\n\nLogs\n\n  docker-compose logs show logs from all containers\n    \n      -f Show logs from all containers and follow\n      -f &lt;service&gt; Show logs from a single service container and follow\n    \n  \n\n\nVersions\nDocker handles versions with Tags. \nTODO: Complete with examples.\n\nHow-to’s\nInteractive shell on compose service\nGet into the docker-compose.yml folder and run the following commands.\ndocker-compose run -d {$SERVICE_NAME}\ndocker exec -it {$CONTAINER_NAME} /bin/bash\n\n",
      tags: [],
      id: 12
    });
    

    index.add({
      title: "Spring in Action (1/5) - Foundational Spring",
      category: null,
      content: "(This are my notes taken from the book Spring in Action 5th Edition)\n\nSpring parts\n\n  Spring core Provides the core container, dependency injection framework, Spring MVC (Rest APIs), Spring’s web framework and support for template-based JDBC and reactive programming with Spring WebFlux.\n  Spring boot Starter dependencies and autoconfiguration.\n  Spring data Provides the ability to define your application’s data repository as Java interfaces. Works with relational (JPA), document (Mongo) and graph (Neo4j) databases.\n  Spring security Authentication, authorization and API security.\n  Spring integration &amp; Batch helps integrate with other applications\n  Spring cloud helps with microservices\n\n\n\nProject structure\nsrc/main/java\n  ApplicationStarter.java\n\nsrc/test/java\n  ApplicationStarterTest.java\n\nsrc/main/resources\n  static\n  templates\n  application.properties\n  schema.sql  \n  data.sql\n\nmvnw.cmd\npom.xml\n\n\n\n  mvnw.cmd maven wrapper scripts. Used to build the project even without maven installed on your computer\n  static folder to place images, stylesheets, js resources to serve to the browser\n  templates folder to place template files that will be used to render content to the browser\n  schema.sql &amp; data.sql they will be executed on start. Useful to create the structure of databases and fill them with data.\n\n\nMain’s config\n@SpringBootApplication is used at the main jar’s Starter as in\n@SpringBootApplication\npublic class ApplicationStarter {\n    // main\n}\n\n\nIt’s a composition Tag which contains another three\n\n  @SpringBootConfiguration Designates the class as a configuration one. is a specialized form of @Configuration\n  @EnableAutoConfiguration Enables Spring to auto-configure any components that it thinks you may need\n  @ComponentScan It lets you use another annotations such as @Component to declare Beans\n\n\nWeb requests\nThe basic structure is an application which will be started with the embedded tomcat. A controller marked with @Controller tag and a @GetMapping(\"/\") tag, which returns the name of the Thymeleaf view to give to the browser.\n\nController class. It handles HTTP Requests and either gives it to a view to return HTML or writes data directly to the body (RESTful)\n\nbasic controller\n@Controller\n@RequestMapping(\"/design\")\npublic class MyController {\n\n    @GetMapping(\"/\")\n    public String home() {\n        return \"home\"; // view name\n    }\n\n}\n\n\nThymeleaf will automatically search for /templates/home.html and return it as the view if it exists.\n\nview controller\nFor a @Controller which is used just to redirect a path to a view and it doesn’t adds any kind of input to the Model, we may implement it with just a single a line at a WebConfig file.\nThe example implemented on top would be better as the following\n@Configuration\npublic class WebConfig implements WebMvcConfig {\n\n  @Override\n  public void addViewControllers(final\n            ViewControllerRegistry registry) {\n    registry.addViewController(\"/\")\n            .setViewName(\"home\");\n  }\n\n}\n\n\nrequest mapping tags\n\n  @RequestMapping(method = RequestMethod.GET) general tag prior to Spring 4.3\n  @GetMapping handles HTTP GET request\n  @PostMapping handles HTTP POST request\n  @PutMapping handles …\n  @DeleteMapping\n  @PatchMapping\n\n\nthymeleaf\n(See thymeleaf notes)\n\nFull Validation Example\nJava’s validation API works with Spring and Hibernate, this last adds a bunch of annotations to use and may work together between Model, View and Controller.\n\ndeclare validation rules\nThis is done at the model.\n@Data\npublic class Taco {\n\n  @NotNull\n  @Size(min=5,\n        message=\"must be at least 5 chars long\")\n  private String name;\n\n  @Size(min=1,\n        message=\"must choose at least 1 ing\")\n  private List&lt;String&gt; ingredients;\n\n}\n\n\nWe also have other tags such as\n@NotBlank(message=\"name is required\")\nprivate String name;\n\n@CreditCardNumber(message=\"card not valid\")\nprivate String ccNumber;\n\n@Pattern(regexp=\"here comes the regex\",\n         message=\"must be MM/YY\")\nprivate String ccExpiration;\n\n@Digits(integer=3, fraction=0,\n        message=\"invalid CVV\")\nprivate String ccCVV;\n\n\nactivate validation\nThis is done at the controller w. @Valid.\n@PostMapping\npublic String process(@Valid\n@ModelAttribute(\"design\") final Taco design,\n                          final Errors errors)\n{\n  if(errors.hasErrors()) {\n    return \"design\";\n  }\n  // do something\n  return \"viewX\";\n}\n\nIf an error is found, the details of this error will be loaded into the Errors object\n\naccess the errors\nThis is done at the view.\n&lt;form method=\"POST\" th:object=\"${design}\"&gt;\n\n&lt;div th:if=\"${#fields.hasErrors()}\"&gt;\n    &lt;p class=\"validationError\"&gt;\n      Please, correct following problems\n    &lt;/p&gt;\n&lt;/div&gt;\n\n&lt;div&gt;\n  &lt;h3&gt;Name your Taco creation:&lt;/h3&gt;\n\n  &lt;span class=\"validationError\"\n        th:if=\"${#fields.hasErrors('name')}\"\n        th:errors=\"*{name}\"&gt;Placeholder&lt;/span&gt;\n  &lt;br/&gt;\n  &lt;input type=\"text\" th:field=\"*{name}\"/&gt;\n\n  &lt;button&gt;Submit your taco&lt;/button&gt;\n&lt;/div&gt;\n&lt;/form&gt;\n\n\nall broken together\n\n  The tags @NotNull declare what’s wrong and when an Error should be thrown.\n  At the controller with the line @Valid @ModelAttribute(\"design\") final Taco design we declare what the model is and we assign it an id = design.\n  At the view form:\n    \n      we access this model with th:object=\"${design}\"\n      we check if the form has any error(s) with th:if=\"${#fields.hasErrors()}\" to show a general error\n      we check a specific field with th:if=\"${#fields.hasErrors('name')}\" and access the error message with th:errors=\"*{name}\" to overwrite the placeholder.\nThis name is a field of the model we gave. At this example Taco has a private String name field which is the one we’re checking here.\n    \n  \n\n\n## Store Model attributes in a HTTP session (cache)\n  This is used to store values which have to be used in between requests.\n\nThe @SessionAttributes is used in a @Controller class and whose value matches the one in @ModelAttribute.\n  When a request comes in it checks if there’s an existing value in the HTTP session, if it does, it retrieves it directly without calling the method again.\n\n  @Controller\n  @RequestMapping(\"/design\")\n  @SessionAttributes(\"ingredients\")\n  public class Controller {\n\n    @ModelAttribute(\"ingredients\")\n    public List&lt;Ingredient&gt; addIng(final Model model) {\n      final List&lt;Ingredient&gt; ings = // ...\n      // first time this will be executed\n      // second time it will retrieve the value from the cache\n      return ings;\n    }\n\n  }\n\n\nDatabases\nJDBC (Java DataBase Connection)\nIts support is rooted at JdbcTemplate.java. It provides a mean for developers to perform SQL operations against a relation database without boilerplate code.\n\nWorking with JdbcTemplate\nDependencies to add:\n&lt;dependency&gt;\n  &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;\n  &lt;artifactId&gt;spring-boot-starter-jdbc&lt;/artifactId&gt;\n&lt;/dependency&gt;\n\n\nFor every Bean to support, we should have an interface and an implementation of it, which will delegate all the operations to JDBC.\n\npublic interface TacoRepository {\n  public Taco save(final Taco taco);\n}\n\n\n@Repository\npublic class JdbcTacoRepository\n  implements TacoRepository {\n\n    @Autowired\n    private final JdbcTemplate jdbc;  \n\n    @Override\n    public Taco save(final Taco taco) {\n      // ...\n      final PreparedStatementCreator psc = new\n        PreparedStatementCreatorFactory(\n          \"insert into Taco (name, createdAt) values (?, ?)\",\n          Types.VARCHAR, Types.TIMESTAMP\n        ).newPreparedStatementCreator(Arrays.asList(taco.getName(),\n        new Timestamp(taco.getCreatedAt().getTime())));\n\n      final KeyHolder kh = new GeneratedKeyHolder();\n      this.jdbc.update(psc, kh);\n      return keyHolder.getKey().longValue();\n    }\n  }\n\n\nThe code is hard to read, and it still requires quite an amount of boilerplate for just an operation.\n",
      tags: [],
      id: 13
    });
    

    index.add({
      title: "SQL cheat-sheet",
      category: null,
      content: "DDL Queries\n\n  Show all dbs - SHOW DATABASES;\n  Select one - USE {$db};\n  Show tables in a db - SHOW TABLES;\n  Show description of DB - DESCRIBE {$db}\n\n\nCreate new table\nCREATE TABLE table_name (\n\tid numeric,\n\tdescription text);\n\n\nDML Queries\nUpdate\nUPDATE table_redacted\n\tSET state = \"IMPORTED\"\n\tWHERE state = \"EXPORTED_FAILED\";\n\n\nSelects\njoin\nSELECT *\n\tFROM data_transaction t JOIN\n\t\ttransaction_item i\n\tON(t.data_transaction_number\n\t\t= i.data_transaction_id)\n\tWHERE t.data_transaction_number = 123456;\n\nand / or preference order\nThe category HAS to be SG OR SH + all the previous conditions.\nSELECT COUNT(*), type, operator, category, state\n\tFROM prefix.table_redacted\n\tWHERE type = \"S\"\n\tAND operator != \"ASD\"\n\tAND (category = \"SG\"\n\tOR category = \"SH\")\n\tLIMIT 200;\n\n\nhaving\nSELECT title, start_date, COUNT(*)\n\tFROM appointment\n\tGROUP BY title, start_date\n\tHAVING COUNT(*) &gt; 1\n\tORDER BY COUNT(*) DESC;\n\n\ndate like\nSELECT COUNT(*)\n\tFROM invoice_position\n\tWHERE reference_date LIKE \"%2019-01%\";\n\n\nbetween\nSELECT id, state\n\tFROM invoice_position\n\tWHERE id BETWEEN 140 AND 144;\n\n\nSubqueries\nFind all Items from all Invoices, which belong to a transaction with a card_uid 0410ed522d5e81\n\nSELECT *\nFROM transaction_item\nWHERE data_transaction_id IN (\n\tSELECT data_transaction_number\n\t\tFROM data_transaction\n\t\tWHERE card_uid = \"0410ed522d5e81\"\n);\n\n\nDelete all invoices except the ones with the card uids I want\nDELETE\nFROM data_transaction\nWHERE data_transaction_number NOT IN(\n\tSELECT data_transaction_number\n\tFROM\n\t(SELECT data_transaction_number\n\t\tFROM data_transaction\n\t\tWHERE card_uid = \"0410ed522d5e81\"\n\t\tOR card_uid = \"0464cd3a2b5e80\"\n\t) invoice\n);\n\nReference\nhttps://www.w3schools.in/mysql/ddl-dml-dcl/\n",
      tags: [],
      id: 14
    });
    

    index.add({
      title: "Thymeleaf",
      category: null,
      content: "Thymeleaf is an HTML template engine, which provides full Spring support.\n\n&lt;h3&gt;Designate your wrap:&lt;h3&gt;\n  &lt;div th:each=\"ingredient: ${wrap}\"&gt;\n    &lt;input name=\"ingredients\" type=\"checkbox\"\n            th:value=\"${ingredient.id}\" /&gt;\n    &lt;span th:text=\"${ingredient.name}\"&gt;ING&lt;/span&gt;\n    &lt;br/&gt;\n  &lt;/div&gt;\n\n\nOperators\n\n  @{} produces a context-relative path to the /static/ folder\n\n\nSimple Tags\n\n\n  th:src=\"@{images/taco.png}\" retrieves an image with relative path from /static/\n  th:href=\"@{/styles.css}\" retrieve a css file\n\n\n\nRetrieve an attribute\nth:object=\"${id}\"\n\nI add into the Model an attribute, for exampel a Taco with id tacoDesign\n\nDesignTacoController.java\n@GetMapping\npublic String process(final Model model) {\n  model.addAttribute(\"tacoDesign\", new Taco());\n  return \"design\"; // return thymeleaf view\n}\n\n\nAt the view, we retrieve it like\n\ndesign.html\n&lt;form method=\"POST\" th:object=\"${tacoDesign}\"&gt;\n  &lt;!-- Form body --&gt;\n&lt;/form&gt;\n\n\nIterate lists\nth:each = ${subelement_id: list_id}\n\nSame example as above. There’s a list from Objects added into the Model at Java and they’ve to be retrieved at the HTML form.\n@GetMapping\npublic String process(final Model model) {\n  final Ingredient ing1 =\n  new Ingredient(\"FLTO\", \"Flour tortilla\", Type.WRAP);\n  final Ingredient ing2 =\n  new Ingredient(\"COTO\", \"Corn tortilla\", Type.WRAP);\n\n  final List&lt;Ingredient&gt; ingredients =\n                      Arrays.asList(ing1, ing2);\n\n  /**\n   * This adds a lists into the model with\n   * 2 ingredients with id = wrap\n   */\n  for(final Type type : Type.values()) {\n    model.addAttribute(\n      type.toString().toLowerCase(),\n      filterByType(ingredients, type)\n    );\n  }\n\n  return \"design\";\n}\n\n\nIterate only the wrap ingredients\n&lt;div th:each=\"ingredient: ${wrap}\"&gt;\n  &lt;input name=\"x\" type=\"y\"\n         th:value=\"${ingredient.id}\"/&gt;\n  &lt;span th:text=\"${ingredient.name}\"&gt;\n    PLACEHOLDER\n  &lt;/span&gt;\n&lt;/div&gt;\n\n\nRedirect to another view\nredirect:/path/view\n\nThe difference is, if we have a GET where we return a normal view\n@GetMapping\npublic String process(final Model model) {\n  model.addAttribute(\"tacoDesign\", new Taco());\n  return \"design\"; // return thymeleaf view\n}\n\nIt will execute all the previous code before the view is loaded and given to the user. If instead of this, we have a POST and once it’s ready we want to give a new view to the user, we have to do it through redirect\n@PostMapping\npublic String processDesign(final Taco taco) {\n    log.info(\"processing design '{}'\", taco);\n    return \"redirect:/orders/current\";\n}\n\n",
      tags: [],
      id: 15
    });
    

    index.add({
      title: "Changes in Java12",
      category: null,
      content: "Switch expression\nIt has been revamped to act as an expression. It removes the usage of break.\nswitch(day) {\n  case SATURDAY, SUNDAY -&gt; System.out.println(1);\n  case TUESDAY, FRIDAY -&gt; System.out.println(2);\n  case THURSDAY, MONDAY -&gt; System.out.println(3);\n  case WEDNESDAY -&gt; System.out.println(4);\n}\n\n\nTeeing collectors\nAllows to collect two pieces of information from a stream pipeline.\nFor example, I want to obtain min and max from an Stream&lt;Integer&gt; to create a range.\nfinal List&lt;Integer&gt; list = Lists.of(1, 2, 5, 8);\nfinal Range&lt;Integer&gt; range = list.stream()\n      .collect(Collectors.teeing(\n           Collectors.minBy(Integer::compareTo),\n           Collectors.maxBy(Integer::compareTo),\n           // custom created Range factory.\n           Range::ofOptional));\n\n\nMisc.\nAPI Changes\n\n  new String.format() method to indent and format Strings\n  better error recovery in CompletableFuture\n  new CompactNumberFormat to format numbers in a fashionable way\n  new method Files.mismatch(file1, file2), compares two files and returns the index of the first byte where they differ or -1\n\n\nShenandoah\nNew garbage collection (GC) algorithm made for applications who prefer responsiveness and predictable short pauses.\n\nReferences\nhttps://blog.overops.com/the-complete-guide-to-java-12-new-features/\nhttps://blog.codefx.org/java/java-12-guide/#Teeing-Collectors\n",
      tags: [],
      id: 16
    });
    

    index.add({
      title: "Spring Beans",
      category: null,
      content: "A spring bean is the basic building block of a Spring App. In its basis, it’s an Object which Spring Framework manages at runtime.\n\nThis management includes:\n\n  Creating an Object\n  Filling dependencies\n  Intercepting method calls\n  Destroying the Object\n\n\nDefine a Spring Bean\nThere’re 3 ways:\n\n\n  declare it with @Component annotation\n  @Bean annotation at a Bean Factory\n  .xml config. file (old way)\n\n\n\n@Component\nThis is the most common way if you own the source code and it hasn’t any special dependency. It has to be used together with component scanning.\n\nIt includes the following 3 derivatives. The difference is purely informative.\n\n  @Service\n  @Repository\n  @Controller\n\n\n@Service\npublic class MyService {\n  // code\n}\n\n\n@Bean\nFor classes you don’t own, you have to declare them with @Bean at a configuration class. Also for your own classes which have weird dependencies and Spring cannot auto-inject them.\n\n@Configuration\npublic class MySpringConfig {\n\n  @Bean(name = \"notMyService\") // name optional\n  public NotMyService notMyService() {\n    return new NotMyService();\n  }\n\n}\n\n\nBean Properties\n\n\n  class\n  name\n  dependencies\n  scope\n  initialization mode\n  initialization / destruction callback\n\n\nName\nSpring automatically gives a name to your beans. It uses it to identify each one. Mostly, it’s common to set your own bean name when you have more than one different instance for a class and you need to differentiate them.\n\nDependencies\nWe inject them with @Autowired annotation at the constructor.\n\n@Component\npublic class MyComponent {\n\n  private final MyDependency myDep;\n\n  @Autowired\n  public MyComponent(final MyDependency myDep) {\n    this.myDep = myDep;\n  }\n\n}\n\n\nThe tag it’s not needed if we only have 1 constructor. If we have more, we have to mark\none of them so Springs knows which one to auto-inject.\n\nScope\nIt defines how many instances of a class the framework creates at runtime.\nThe default behaviour is singleton!\n\n\n  singleton - just one instance\n  prototype - a new one on every inject\n\n\n@Bean\n@Scope(\"prototype\")\npublic NotMyService notMyService() {\n  return new NotMyService();\n}\n\n\n@Component\n@Scope(\"prototype\")\npublic class MyComponent {\n  // code\n}\n\n\nInitialization Mode\nWhen the application starts, Spring creates all singleton beans at startup. This detects errors in the beans, but makes the startup slow. @lazy delays the creation\nof a Bean to when it’s first needed.\n\n@Lazy\n@Component\npublic class MyComponent {\n  // Code\n}\n\n\nInitialization / destruction Callback\nThis is to execute some logic, after the bean was fully built and its dependencies\nwere injected or before the bean is destroyed.\n\nown bean\n\n  Make the class implement the interface InitializingBean / DisposableBean and implement the method which comes with it.\n  Or create our own method and tag it with javax @PostContruct / @PreDestroy\n\n\nexternal bean\nImplement a method (it may be private) and do the following at the declaration of the bean:\n@Bean(initMethod=\"methodName\", destroyMethod=\"name\")\npublic NotMyService notMyService() {\n  return new NotMyService();\n}\n\n\nReference\nhttp://dolszewski.com/spring/spring-bean/\n",
      tags: [],
      id: 17
    });
    

    index.add({
      title: "Java11 - Run file as a script",
      category: null,
      content: "(This uses &gt; java11)\n\nTo run a file as Java, we don’t need to do anything special to the .java file. Just write a class with a main() method and call it with java --source 11 file.java\n\nLinux Shebang\nTo start it as a script in Linux we need to add java’s shebang #!/opt/jdk-11/bin/java --source 11 and do it executable chmod +x file.java. The shebang may need to be replaced if the java path is different.\n\nImportant\nIf we’re starting a java file as a script, the file’s name cannot end with .java or it won’t work.\n",
      tags: [],
      id: 18
    });
    

    index.add({
      title: "MongoDB",
      category: null,
      content: "Config\nConfig. to run MongoDB\n\n  Set PATH as system variable (~/.bashrc)\n  Create folders /data/db and set rw- permissions to correct user.\n  start mongod\n\n\nQueries\nFind\nby element\n\ndb.getCollection('documentX').find({ _id : ObjectId(\"5b7e99a9149559198c5024a4\") })\n\n\nby sub-element\n\ndb.getCollection('doc').find({ \"doc.$id\" : ObjectId(\"5bc6ea45c9979cda5f1a7ed6\") })\n\n\nlike\nFields which contains question mark\n\ndb.getCollection('doc').find({ \"title\": /�/ })\n\n\nsort by\nLatest created\n\ndb.getCollection('doc').find({}).sort({ \"createdAt\":-1 })\n\n\nlimit results\n\ndb.getCollection('doc').find({}).limit(5)\n\n\nand / or\n\ndb.getCollection('doc').find({\n    $and : [\n        { \"subelement.$id\" : ObjectId(\"58b57fcdc998001a00000004\") },\n        { \"field2\" : \"CAR\" }\n    ]\n})\n\n\ndate\ngreater or equal\n\ndb.getCollection('doc').find({\n    \"createdAt\" : { $gte : new ISODate(\"2018-10-09 00:00:00.000Z\") }\n})\n\n\nnot equal\n\ndb.getCollection('doc').find({\n    $and : [\n        { \"field\" : \"90\" },\n        { \"field2\" : { $ne : 2 } }\n    ]\n})\n\n\nSubquery\n\nEvery doc contains a provided_doc, but from provided_doc I cannot go back to doc.\n// Obtain all ids from provided_docs which have a competitionId = 90 &amp; regionID != 1\nvar docs = db.getCollection('provided_doc').find({\n    $and : [\n        { \"competitionId\" : \"90\" },\n        { \"regionID\" : { $ne : 1 } }\n    ]\n}).map(function(providedDoc) {\n    return providedDoc._id\n});\n\n// search all docs which contain a provided_doc with one of those ids\ndb.getCollection('doc').find({\"doc.$id\" : { $in:docs }});\n\nCheck for Nulls\nTry both options, they may give different results back.\n\ndb.getCollection('doc_event').find({\"orderNum\" : {$exists:false}})  \ndb.getCollection('doc_event').find({ \"orderNum\" : null })\n\n\nUpdate\nOnly change “firstName” field of this object\n\ndb.player.update(\n    { \"_id\" : ObjectId(\"5b7e77060e885706eb574118\") },\n    { $set :\n        {\"firstName\" : \"Sacha\"}\n     }\n)\n\n\nDatabases\n\n\n  db - show current database\n  show dbs - show all databases with size\n  use $db - create / select database\n\n\ndrop database\n\n\tuse $db\n\t$db.dropDatabase()\n\n\nCollections\n\n\n  show collections - show all collections\n  db.collection.drop() - drop collection\n\n\nCreate collection\n\ndb.createCollection($name, $options {capped, autoIndexId, size, max }) # Parameters\ndb.createCollection(\"my-col\", { capped : false, autoIndexId : true})\n\n\nDocuments\n\n\n  db.collection.find().pretty() - query all\n\n\nCreate\n\ndb.collection.insert({\n\ttitle : \"First Document\",\n\tdescription : \"My first created document\",\n\tby : \"msanchez\",\n\turl : \"www.google.es\",\n\ttags : [\"mongodb\", \"document\", \"first\"],\n\tlikes : 100\n})\n\n\nMisc\nsee list of changes:\n\ndb.getCollection('jv_snapshots').find({\"globalId.cdoId\": \"5b7e77060e885706eb574109\"})\n\n\nSpecial chars\nTo select something with specials chars in the same:\n\ndb.myCollection.drop()      # Collection w. camel case.\ndb[\"my-collection\"].drop()  # Collection w. symbols in the name.\n\n",
      tags: [],
      id: 19
    });
    

    index.add({
      title: "SQL - administration",
      category: null,
      content: "(All this commands are for MySQL)\n\nConnection\nConnect to DB from CLI\n\nmysql -u {$user} -p    \n\n\nUser\n\n  SELECT CURRENT_USER(); See current logged user\n\n\nChange password when we know the old one\nSET PASSWORD FOR 'root'@'localhost' = PASSWORD('myNewPassword');\n\n\nCreate new User\nCREATE USER 'user'@'localhost' IDENTIFIED BY 'password';\n\n\nGrant Privileges to user\nGRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost'\n\tWITH GRANT OPTION;\n\n",
      tags: [],
      id: 20
    });
    

    index.add({
      title: "Google advanced queries",
      category: null,
      content: "Advanced search queries\n\n  site:stackoverflow.com {$query} search specific site\n  related:{$site} search for a web similar to other one you already know\n  filetype:pdf search by a file type\n  {$param1} OR {$param2} search for one parameter or the other\n  $param1 ~$flexible_param search for a word or synonims of a word\n\n",
      tags: [],
      id: 21
    });
    

    index.add({
      title: "Maven",
      category: null,
      content: "Checkstyle\nTo check all the errors in checkstyle and where they’re located:\n\n  go to the project’s folder where the error triggers\n  open target/checkstyle-result.xml\n  search for =\"error\"\n  there the classes’ name and the error line # can be seen\n\n\nPMD\nTo find where the error is located. Search for the String priority=\"1\". If nothing is found, search for prio 2, 3…\n\n\nLaunch options\nResume a build from the microservice where it failed\n\nmvn -rf myproject clean install\n\n\nBuild only two modules from the project\n\nmvn -pl module1,module2 clean install\n\n\nDependency version ranges\n(work always with the latest version of a dependency)\n\n&lt;!--Specifies from 1.1.0 on. The latest one --&gt;\n&lt;version&gt;[1.1.0,)&lt;/version&gt;\n\n",
      tags: [],
      id: 22
    });
    

    index.add({
      title: "HateOAS",
      category: null,
      content: "Rest levels\nModel of restful maturity used to help explain the specific properties of a web-style system.\n\nLevel 0\nThe starting point for the model is using HTTP as a transport system for remote interactions, but without using any of the mechanisms of the web.\nWe publish a document on how to use our API. We declare only one endpoint and do all the communication through this endpoint.\n\nLevel 1\nNow rather than making all our requests to a singular service endpoint, we now start talking to individual resources or endpoints. One specific for every action we want to do.\n\nLevel 2\nUses all the HTTP verbs as closely as possible as to how they’re used in HTTP itself. This are GET, POST, DELETE…\n\nLevel 3\nIntroduces HATEOAS (Hypertext As The Engine Of Application State). It addresses the question of how to get from a list open slots to knowing what to do to complete our action.\n\nReference\nhttps://www.martinfowler.com/articles/richardsonMaturityModel.html\n\nHATEOAS\nThe point of hypermedia controls is that they tell us what we can do next, and the URI of the resource we need to manipulate to do it. Rather than us having to know where to post our appointment request, the hypermedia controls in the response tell us how to do it.\n\nThe first post is the same as one of level 2\n\nPOST /slots/1234 HTTP/1.1\n[various other headers]\n\n&lt;appointmentRequest&gt;\n  &lt;patient id = \"jsmith\"/&gt;\n&lt;/appointmentRequest&gt;  \n\n\nBut the reply contains a number of hypermedia controls for different things to do next.\n\nHTTP/1.1 201 Created\nLocation: http://royalhope.nhs.uk/slots/1234/appointment\n[various headers]\n\n&lt;appointment&gt;\n  &lt;slot id = \"1234\" doctor = \"mjones\"   \n    start = \"1400\" end = \"1450\"/&gt;\n  &lt;patient id = \"jsmith\"/&gt;\n  &lt;link rel = \"/linkrels/appointment/cancel\"\n        uri = \"/slots/1234/appointment\"/&gt;\n  &lt;link rel = \"/linkrels/appointment/addTest\"\n        uri = \"/slots/1234/appointment/tests\"/&gt;\n  &lt;link rel = \"self\"\n        uri = \"/slots/1234/appointment\"/&gt;\n  &lt;link rel = \"/linkrels/appointment/changeTime\"\n    uri = \"/doctors/mjones/slots?date=20100104&amp;status=open\"/&gt;\n  &lt;link rel =  \n    \"/linkrels/appointment/updateContactInfo\"\n        uri = \"/patients/jsmith/contactInfo\"/&gt;\n  &lt;link rel = \"/linkrels/help\"\n        uri = \"/help/appointment\"/&gt;\n&lt;/appointment&gt;\n\n\nOne obvious benefit of hypermedia controls is that it allows the server to change its URI scheme without breaking clients. As long as clients look up the “addTest” link URI then the server team can juggle all URIs other than the initial entry points.\n\nA further benefit is that it helps client developers explore the protocol. The links give client developers a hint as to what may be possible next. It doesn’t give all the information: both the “self” and “cancel” controls point to the same URI - they need to figure out that one is a GET and the other a DELETE. But at least it gives them a starting point as to what to think about for more information and to look for a similar URI in the protocol documentation.\n\nImplementation\nSpring HateOAS\nStructure\nUntil now we had 2 beans for the representation of an object: Entity and Dto.\nRight now we have one more: Resource. This is the HateOAS representation which we’ll give back and which will directly save the links added. It must extend ResourceSupport.\nA mapping will be needed btw. the entity / dto and the resource.\n\nBuild Link without protocol nor host\n// .scheme removes \"http://\" and .host removes \"127.0.0.1\" or given IP\nfinal String href = ControllerLinkBuilder  \n.linkTo(ControllerLinkBuilder.methodOn(LivetickerEventRestResource.class)  \n.pushEventInDirection(dto.getId(), language, direction)).toUriComponentsBuilder()  \n.scheme(null).host(null).toUriString();  \n\nfinal Link link = new Link(href, rel);\n\n",
      tags: [],
      id: 23
    });
    

    index.add({
      title: "Python - cheat sheet",
      category: null,
      content: "Pip\nUsage to install a package\n\npython -m pip install flask\n\nBeautifulSoup\nFind all elements of tag\ndef find_tag(self, tag):  \n        paragraphs = self.soup.find_all(tag)  \n        paragraph = paragraphs[0]  \n        text = paragraph.get_text()\n\n\nFind first element of tag\ndef find_first_tag(self, tag):\n        paragraph = self.soup.find(tag)\n        text = paragraph.get_text()\n\n\nFind elements of a class\ndef find_by_class(self, wanted_class):\n        tags = self.soup.find_all(class_=wanted_class)\n\n\nFind element with id\ndef find_by_id(self, wanted_id):\n        tag = self.soup.find_all(id=wanted_id)\n\n\nFind element of tag with class\ndef find_tag_by_class(self, tag, wanted_class):\n        tags = self.soup.find_all(tag, class_=wanted_class)\n\n\nFind elements with CSS selectors\ndef search_by_css_selectors(self, selector):\n        tags = self.soup.select(selector)\n\n",
      tags: [],
      id: 24
    });
    

    index.add({
      title: "Golang - code cheat sheet",
      category: null,
      content: "Installation\nCompile\nTo compile / build / run in Sublime\n\n  ctrl + shift + P\n  go run\n\n\nMultiple workspaces\nFor a custom installation, it’s possible to give more than one value to GOPATH.\nexport GOPATH=\"/home/msanchez/go/packages/bin:/home/msanchez/Documents/Personal/Github/language_testing/golang\"\n\n\nThe first value is used as default to install packages. The second and next ones may be used as standalone workspaces. It’s important for the root of the workspace to be /src, otherwise it will complain and not compile into /bin.\n\nCode\nTemplate\nThis is all needed to test.\n\npackage main\n\nfunc main() {\n\n}\n\n\nVariables\nSemicolons are not needed.\n\nvar age int // assigned to 0 by default\nvar footSize = 45 // type inference\n// multiple variables of same type\nvar headSize, waistSize = 200, 70\n// constant declaration\nconst  height = 180\n\nvar ( // multiple variables of different type\n  name     = \"Mario\"\n  myAge    = 5\n  lastName = \"nope\"\n)\n\n// shorthand declaration\nheartSize, country := 100, \"Italia\"\n\n// the space btw. variables is automatically given\nfmt.Println(\"my age is:\", age,\n  \"and my foot size: \", footSize)\n\n\nFunctions\ndeclaration\nThe basic structure for a Function is\n\nfunc functionName(parameterName type) returnType {\n  // code\n}\n\n\nThe parameters and the return type are optional. So the following is also valid go\nfunc functionName() {\n  // code\n}\n\n\nFor consecutive parameters with the same type, it is only needed to declare it once\n// param1 is an int too\nfunc functionName(param1, param2 int) {\n\n}\n\n\nMultiple return values\nfunc functionName(param1, param2 int)(int, int) {\n  return param1, param2\n}\n\nfunc main() {\n  param1, param2 := functionName(12, 64)\n}\n\n\nNamed, multiple return values\nfunc functionName(param1, param2 int)(result1, result2 int) {\n  result1 = param1\n  result2 = param2\n  return // no explicit return value\n}\n\n\nblank identifier\n_ is known as the blank identifier. It can be used in place of any value of any type to discard it.\n// what happens if I only need result1 and want to discard result2?\nfunc functionName(param1, param2 int)(result1, result2 int) {\n  result1 = param1\n  result2 = param2\n  return // no explicit return value\n}\n\nfunc main() {\n  param1, _ := functionName(12, 64)\n}\n\n\nPackages\nEvery go exec must have an entry point. This is a main function which has to reside in the main package.\n\nWe have the following tree:\n\nsrc/\n    programm/\n        custom_package/\n            custom.go # custom class\n    programm.go # This is the main\n\n\nTo install the custom package from /src execute go install programm\n\nTo import the contents from custom.go and use it at programm.go we’ll have to import it with a relative path\n\npackage main\n\nimport (\n\t\"packages/custom\"\n)\n\nfunc main() {\n  // code\n}\n\n\nOnly the functions which start with a capital letter at custom.go will be exported and accessible from the outside.\n\nReference\nhttps://golangbot.com/learn-golang-series/\n",
      tags: [],
      id: 25
    });
    

    index.add({
      title: "Golang - installation",
      category: null,
      content: "Check installation\n\n  go version\n\n\nEnvironment variables\n\nGOROOT\nFolder where go was installated. It must only be set when installing to a custom location.\n\nGOPATH\nPlace to get, build and install packages outside the standard Go Tree.\n\nSource\n\n# golang\nexport GOPATH=/home/msanchez/go/packages\nexport GOROOT=/home/msanchez/Programs/go\nexport PATH=$PATH:$GOROOT/bin:$GOPATH/bin\n\n\nIDE preparation\nI use Sublime, to get it ready:\n\n\n  ctrl + shift + p\n  install package\n\n\nInstall the packages:\n\n  GoOracle\n  All Autocomplete\n\n\n(missing steps)\n\n\n  install https://github.com/golang/sublime-build\n\n\nTo compile / build / run\n\n  ctrl + shift + P\n  go install\n  go run\n\n",
      tags: [],
      id: 26
    });
    

    index.add({
      title: "Liquid",
      category: null,
      content: "Liquid is a template engine for HTML. It’s used by Jekyll.\n\nVariables Usage\n\n  Declaration in a config.yml file with home_sidebar: Home\n  Usage with liquid in file.html as {{ site.home_sidebar }}\n\n\nFunctions\nShow liquid code snippets\nWhen writing liquid code snippets, jekyll process this code instead of showing it. To solve this, wrap the code snippet with the tags\n\n{percent raw percent}\n{percent endraw percent}\n\n\n\nStructures\n\nif\n\n{% if p.layout == 'page' and p.order == current_index %}\n    // do thing\n{% endif %}\n\n\nfor loop\n\n{% for p in site.pages %}\n    // do thing\n{% endfor %}\n\n\n",
      tags: [],
      id: 27
    });
    

    index.add({
      title: "Jekyll",
      category: null,
      content: "Jekyll is a blog-aware static site generator, written in ruby. It’s used for Github Pages and it transforms files written in markdown and liquid into a full HTML web.\n\nInstallation\nPre-requirements:\n\n  sudo apt-get install ruby-full build-essential zliblg-dev\n  sudo gem install jekyll bundler\n\n\nConfiguration\nThe basic config is under _config.yml\n\nUsage\nLocal\nThis goes well to test new changes in local. To see how it would look when deployed.\n\n\n  sudo jekyll new myBlog creates a myBlog folder with all to start. (Only first time).\n  sudo bundle exec jekyll serve inside this folder, starts web server at  localhost:4000\n\n\nGithub Pages\nJust edit the .md files, do a push and it will be automatically updated.\n\nCode\nfile example\nIt will be automatically rendered. The code btw. --- tags is metadata for jekyll.\n\n---\nlayout: page\ntitle: About\ndate:   2019-03-01 16:48:18 +0100\ncategories: test post\npermalink: /oh-no/\n---\n\nOh no! This is a new post.\n\n\nlayouts\nDefault theme: minima\n\ncustom theme\nSteps to get it running:\n\n\n  unzip file\n  run gem instal jekyll bundler\n  copy everything from the theme and override everything created by default when jekyll new myBlog\n  run bundle install\n  vim Gemfile and modify the values wdm and &gt;=0.1.0 for listen and ~&gt; 3.0. (This is because wdm is only for windows. Listen is compatible with Linux).\n  Modify at index.md the current value for default\n  bundle exec jekyll serve\n\n\ncustom changes\n\n  \n    made home a variable.\nChanged the value Home at the sidebar from a constant to a variable. Made this setting a variable into _config.yml and calling it at sidebar.html with About\n  \n  \n    order main menu buttons\nchanges at sidebar.html. Will need a fix when liquid arrays are improved.\n\n     {% assign current_index = 0 %}\n {% for page in site.pages %}\n &lt;!-- For every page to check, start a new for loop with counter++ and check if it's the turn for the page to be inserted. --&gt;\n     {% for p in site.pages %}\n         {% if p.layout == 'page' and p.order == current_index %}\n             &lt;a href=\"{{ p.url | prepend: site.baseurl | prepend: site.url }}\" {% if p.url == page.url %}class=\"active\"{% endif %}&gt;{{ p.title }}&lt;/a&gt;\n             {% assign current_index = current_index | plus:1 %}\n         {% endif %}\n     {% endfor %}\n {% endfor %}\n    \n  \n\n\ntwitter handle\nAt _config.yml. I’ve just changed the variable twitter_username for linkedin_username as I do not want my Twitter to be public for this kind of things.\n",
      tags: [],
      id: 28
    });
    

    index.add({
      title: "Spring Cache",
      category: null,
      content: "Spring Cache\nA cache itself may be imagined as a key-value map. For a basic Cache we need:\n\n  @EnableCaching tag in @Configuration class\n  Declare a CacheManager Bean\n  Tag the method to cache w. @Cacheable\n  Create a method with @CacheEvict\n\n\nWe may declare +1 cache(s) at the cache manager and select the one we want to use in the method we tag. As key for the cache we may use any conjunction of the parameters given to the method, or if this is a class, any of it’s accessible variables. The cache will only be triggered when the exact key is given again. Then the method won’t be executed and the value will be directly given from the cache. If the parameters don’t match any key, the method will be executed as normal and then the value will be saved into the cache to be returned the next time.\n\nCaution with logs in big apps as they need to be written accordingly.\nThe hard part is not knowing when to cache something, but to know when to Evict the cache.\n\nDefault Cache\nSpring provides Cache and CacheManager as main abstractions for the caching logic. They do not provide the actual storage to store data. For that we have some options out of the box on the JDK such as SimpleCacheManager. It’s based on ConcurrentMap and it’s useful when we need a really basic Cache, but it does not support the eviction or persistence of the Cache.\n\nEHCache\nThe entities to save, have to implement Serializable interface. If we don’t do that, it’ll throw a NotSerializableException.\nThe config for the several caches is specified in ehcache.xml\n\nInfinispan\nIt’s an in-memory, highly concurrent Cache. It has built-in Eviction. It may be deployed in local mode but it’s a best choice for its cluster mode (distributed or replicated).\n\nReferences\nhttps://spring.io/guides/gs/caching/\nhttps://www.baeldung.com/spring-cache-tutorial\nhttp://websystique.com/spring/spring-4-cache-tutorial-with-ehcache/\nhttps://blog.infinispan.org/2010/02/infinispan-as-local-cache.html\nhttp://infinispan.org/docs/stable/user_guide/user_guide.html#clustering\n",
      tags: [],
      id: 29
    });
    

    index.add({
      title: "Java frameworks - Vertx notes",
      category: null,
      content: "Compile &amp; execute:\nmvn clean install  \njava -jar target/[substitute_with_name]-fat.jar -cluster\n\n\nStandard vs Worker Verticle\nConcurrency is handled completely by Vert.x\n\nWhen created, a standard verticle will have one Event-loop assigned to it (it’ll always use the same) and the start method it’s called within that Event-loop.\nIf it calls other Handlers, it can guarantee that they’ll be executed in the same Event-Loop\nMeanwhile, a worker verticle will have a different Thread assigned to it, everytime it wants to perform a Job.\nIf you’re able to use a standard verticle for non-blocking jobs, you’ll save resources every time you execute code with it.\n\nA standard verticle runs in an Event-Loop thread (one of many). If they’re completely blocked, the whole Program will be blocked and it will just halt.\nOn the other side, the worker verticles run on a different Thread than the main event-loop, so they’re perfect to execute blocking code (another option is an inline .executeBlocking() call). They will never be executed by more than one Thread simultaneously, but they may be executed each time by different Threads.\n\nThe downside of using always workers, is that the max. concurrency achievable is much lesser than using normal verticles + workers. With a lot of blocking tasks, you may create a processing queue.\n\nMulti-threaded worker verticles\nIt can be executed by more than one Thread concurrently. Standard Java techniques for concurrency will be needed when programming. It’s an advanced feature and they’re not supported through all of Vert.x parts.\n\nReferences\nhttps://vertx.io/docs/vertx-core/java/#_verticle_types\nhttps://groups.google.com/forum/#!topic/vertx/4HdQvi2jIJ8\n\nPolyglot Verticles\n(For the example, I’ve used JS)\nIt needs a new dependency in our pom.xml\n&lt;dependency&gt;\n    &lt;groupId&gt;io.vertx&lt;/groupId&gt;\n    &lt;artifactId&gt;vertx-lang-js&lt;/artifactId&gt;\n    &lt;version&gt;3.0.0&lt;/version&gt;\n&lt;/dependency&gt;\n\nWatch out as by default mvn clean install does not pack *.js files into a -fat.jar if they’re in a default java package. I’ve solved this, by writting the .js verticle into the /resources folder.\nAlso, for the .js case, it may be needed to install npm and vertx-3 dependencies for it to work.\nsudo apt-get install npm\nnpm install vertx3-min\n\nReference\nhttps://github.com/vert-x3/vertx-examples/tree/master/core-examples/src/main/js\n",
      tags: [],
      id: 30
    });
    

    index.add({
      title: "Java testing notes",
      category: null,
      content: "Codearte’s Catch exception\nThe only thing it does, it’s to do a bit easier to test and assert for exceptions in a Test Driven Development-like way. To use together with AssertJ. It only has two methods which are useful to me:\n// When\nBDDCatchException.when(this.instance)  \n\t.methodWhichThrowsException();\n\n// Then\nAssertions  \n.assertThat(BDDCatchException.caughtException())  \n.isNotNull()  \n.isExactlyInstanceOf(IndexOutOfBoundsException.class);\n\n\nReference\nhttps://github.com/Codearte/catch-exception\n\nAssertJ\nOutside of the basic Assertions.assertThat(x).isEqualTo(y); there is:\n\nSoft Assertions\nUsed to assert DTOs. With the basic Assertion when the first fails, it stops there and only shows that error. With soft assertions it executes all and shows all where there was an error.\nSoftAssertions.assertSoftly(soft -&gt; {\nsoft.assertThat(dto.getName()).isEqualTo(\"nme\");\nsoft.assertThat(dto.getAge()).isEqualTo(90);\nsoft.assertThat(dto.getRace()).isEqualTo(Race.HUMAN);\n});\n\n\nAssert Collections\nAssertions if the original Beans are accessible to compare against\n// Given\nfinal TolkienCharacter aragorn =   \nnew TolkienCharacter(\"aragon\", 200, Race.HUMAN);\nfinal TolkienCharacter frodo =   \nnew TolkienCharacter(\"frodo\", 30, Race.HOBBIT);\nfinal TolkienCharacter sam =   \nnew TolkienCharacter(\"sam\", 30, Race.HOBBIT);  \n\nfinal List&lt;TolkienCharacter&gt; fellowship =   \n\tLists.newArrayList(aragorn, frodo, sam);\n\n// When\n\n// Then\nAssertions.assertThat(fellowship)\n\t.filteredOn(character -&gt;   \n\t\tcharacter.getName().contains(\"a\"))  \n\t.hasSize(2)\n\t.containsOnly(aragorn, sam);\n\n\nAssertions if the original Beans are not accessible, or it woul be too much work to create them.\n// Given\nfinal List&lt;TolkienCharacter&gt; fellowship =   \n\tthis.prepareFellowship();\n\n// When\n\n// Then\nAssertions.assertThat(fellowship)\n        .extracting(\"name\", String.class)\n        .contains(\"aragorn\", \"frodo\", \"sam\")\n        .doesNotContain(\"sauron\");\n\nReference\nhttps://joel-costigliola.github.io/assertj/assertj-core-features-highlight.html\n",
      tags: [],
      id: 31
    });
    

    index.add({
      title: "From Java8 to Java11",
      category: null,
      content: "This is a list of the changes at Java’s API I found interesting or that I may use frecuently. Not all the changes from Java9, 10 &amp; 11 are listed here.\n\nJava 9\n\nJava REPL (JShell)\nIt stands for Java Shell. It’s used to easily execute and test any Java construction like a class, interface, enum, etc.\n\nModule System\nThe way we deploy Java-Based applications using jars has a lot of limitations &amp; drawbacks. Some of these are: The JRE &amp; JDK are too big; JAR files are too big to use in small devices and applications; There’s no strong encapsulation, public is open to everyone.\n\nThe new Module System introduces new features to avoid all this. More information here.\n\nFactory Methods for Inmutable Collections (List, Map, Set &amp; Map.Entry)\n(I’ll use Lists as an example in this file, but this is valid for Maps and Sets too)\n\nUntil Java8 we could use Collections.unmodifiableList() to achieve this, but this is really verbose. Now we can do the same with\nList inmutableList = List.of(\"bla\", \"ble\", \"bli\");\n\n\nPrivate methods in Interfaces\nTo avoid redundant code and more re-usability we can use private and private static methods directly in interfaces now. Their behaviour is the same as in a normal class\npublic interface Card {\n\n\tprivate Long createcardID() {\n\t\t// calculate and return ID\n\t}\n\n\tprivate static void displayCardDetails() {\n\t\t// implement\n\t}\n\n}\n\n\nTry-with resources improvements\nThe new version improves the one which was implemented in Java SE 7 with better automatic resource management.\n\nJava SE 7 Example\nBufferedReader reader1 = new BufferedReader(new FileReader(\"file.txt\"));\ntry(BufferedReader reader2 = reader1) {\n\t// do something\n}\n\n\nJava 9 Example\nBufferedReader reader1 = new BufferedReader(new FileReader(\"file.txt\"));\ntry(reader1) {\n\t// do something\n}\n\n\nOptionals’ improvements\n#stream()\nIf a value is present in the given Optional object, stream returns a sequential Stream with that value. Otherwise, it returns an empty Stream.\nStream&lt;Optional&gt; employee = this.getEmployee(id);\nStream employeeStream = employee  \n\t.flatMap(Optional::stream);\n\n\n#ifPresentOrElse(Consumer&lt;? super Tl&gt; action, Runnable emptyAction)\nIf a value is present, performs the given action with the value, otherwise performs the given empty-based action.\nOptional&lt;Integer&gt; opt = Optional.of(4);\nopt.ifPresentOrElse(System.out::println,  \n\t() -&gt; System.out.println(\"Not found\"));\n\n\n#or(Supplier&lt;? extends Optional&lt;? extends T» supplier)\nReturns the value contained by the Optional if it has one, or the value given by the supplier if empty.\nOptional&lt;String&gt; opt = Optional.of(\"bla\");\nSupplier&lt;Optional&lt;String&gt;&gt; supplier =  \n\t() -&gt; Optional.of(\"ble\");\nSystem.out.println(opt.or(supplier)); // bla\n\n\nOptional&lt;String&gt; opt = Optional.empty()\nSupplier&lt;Optional&lt;String&gt;&gt; supplier =  \n\t() -&gt; Optional.of(\"ble\");\nSystem.out.println(opt.or(supplier)); // ble\n\n\nStreams\n#takeWhile(Predicate) / #dropWhile(Predicate)\nTakes a predicate as an argument and returns a Stream of the subset until the predicate returns false for the first time. If the first value is false, it gives an empty Stream back.\nStream.of(1, 2, 3, 4, 5)\n\t  .takeWhile(i -&gt; i &lt; 4)\n\t  .forEach(System.out::println); // 1  \n\t\t\t\t\t // 2  \n\t\t\t\t\t // 3  \n\n\n#iterate(T seed, Predicate&lt;? super T&gt; hasNext, UnaryOperator next)\nIt’s similar to the for loop. First parameter is init value, second is the condition and third is to generate the next element.\n// start value = 2; while value &lt; 20;   \n// then value *= value  \nIntStream.iterate(2, x -&gt; x &lt; 20, x -&gt; x * x)\n\t\t .forEach(System.out::println);\n\n\n#ofNullable()\nReturns a sequential Stream containing a single element, or an empty Stream if null.\nStream&lt;Integer&gt; i = Stream.ofNullable(9);\ni.forEach(System.out::println); // 9\n\n\nStream&lt;Integer&gt; i = Stream.ofNullable(null);\ni.forEach(System.out::println); //\n\n\nReferences\nhttps://www.journaldev.com/13121/java-9-features-with-examples\n\nJava 10\n\nLocal-variable Type Inference (var)\nIt adds type inference to declarations of local variables with initializers. It can only be used in the following scenarios:\n\n\n  Limited only to local variable with initializer\n    var numbers = List.of(1, 2, 3, 4);\n    \n  \n  Indexes of foreach loops\n    for(var number : numbers) {\n  // do something\n}\n    \n  \n  Local declared in for loop\n    for(var i = 0; i &lt; numbers.size(); i++) {\n  // do something\n}\n    \n  \n\n\nAPI Improvements\nCollection#copyOf(Collection)\nReturns an unmodifiable list, map or set containing the entries provided. For a List, if the original list is subsequently modified, the returned List will not reflect this modifications.\nList&lt;String&gt; strings = new ArrayList&lt;&gt;();\nstrings.add(\"bla\");\nstrings.add(\"ble\");\n\nList&lt;String&gt; copy = List.copyOf(strings);\nstrings.add(\"bli\");\n\nSystem.out.println(strings); // bla, ble, bli\nSystem.out.println(copy); // bla, ble\n\n\nCollectors#toUnmodifiable…()\nDifferent methods to collect into a unmodifiable collection.\nList&lt;String&gt; strings = new ArrayList&lt;&gt;();\nstrings.add(\"bla\");\nstrings.add(\"ble\");\n\nList&lt;String&gt; unmodifiableStrings =  \n   strings.stream()  \n  .collect(Collectors.toUnmodifiableList());\n\n\nOptional#orElseThrow()\nIs the same as Optional#get() but the doc states that this is a preferred alternative.\nString name = \"bla\";\nOptional&lt;String&gt; optionalName = Optional.ofNullable(name);\nString s = optionalName.orElseThrow(); // bla\n\nOptional&lt;String&gt; empty = Optional.empty();\n// throws java.util.NoSuchElementException  \nString s = empty.orElseThrow();  \n\n\nReferences\nhttps://www.journaldev.com/20395/java-10-features#local-variable-type-inference-jep-286\nhttps://howtodoinjava.com/java10/java10-features/\n\nJava 11\n\nSingle-file Applications\nNow it’s possible to run single-file applications without the need to compile. It really simplifies the process to test new features.\n\nIn the file we have to write the following shebang\n#!/usr/bin/java --source11\n\n\nTo run\njava HelloWorld.java\n\n\nParameters before the name of the source file are passed as parameters to the java launcher. Parameters after are passed as parameters to the program.\njava -classpath /home/bla/java HelloWorld.java Param1\n\n\nType inference for lambdas\nvar was introduced in Java10. The ability to use it in lambdas has been introduced in Java11.\n\nlist.stream()\n\t.map((var s) -&gt; s.toLowerCase())\n\t.collect(Collectors.toList());\n\nWe already had type inference in lambdas, the difference is that with var we can use now type annotations to Lambda parameters.\n\nlists.stream()\n\t.map((@Notnull var s) -&gt; s.toLowerCase())\n\t.collect(Collectors.toList());\n\n\nMore info on type annotations.\n\nString API improvements\n#repeat\nAllows concatenating a String with itself a number x of times\nString s = \"bla \";\nString result = s.repeat(2); // bla bla\n\n\n#isBlank\nChecks wether a String is empty or contains a whitespace\nString s = \"\";\nboolean result = s.isBlank(); // true\n\n\n#strip\nDeletes whitespace on the start &amp; end of a String. The difference with String#trim is that this is unicode aware. It relies on the same definition of whitespace as String#isBlank. This is a preparation for raw strings.\nString s = \" bla \";\nString result = s.strip(); // bla (without spaces)\n\n\n#lines\nTo easily split a String into a Stream of separate lines.\nString s = \"bla\\nble\";\nList&lt;String&gt; lines = s.lines()  \n\t.collect(Collectors.toList()); // bla  \n  \t\t\t\t                 // ble\n\n\nReferences\nhttps://www.azul.com/90-new-features-and-apis-in-jdk-11/\nhttps://4comprehension.com/java-11-string-api-updates/\n",
      tags: [],
      id: 32
    });
    

    index.add({
      title: "Java patterns",
      category: null,
      content: "Implementation of several patterns in Java, which may be used as future example on how to technically implement them.\n\n\n  Database\n  Structural\n  Behavioural\n  Creational\n\n\nDatabase\n\nDAO &amp; DTO\nData Access Object &amp; Data Transfer Object.\nDAO - Design pattern, used to encapsulate the access to a persistence resource (e.g a database) and eliminate dependencies which come with the implementation of the code.\nDTO is the object which representates an entity of the database, with all its own properties to be manipulated.\n\n\nStructural\n\nFaçade\nHelps with Model View Controller. Establishes a new layer to separate and encapsulate the code.\n\nSingleton\nLimits and sets a way to access an unique object instantiation during the whole execution of a program.\n\n\nBehavioural\n\nState\nAllows to change the behaviour of an object through its own state. Depending the state the object is at, allows to manipulate it one way or another.\nParts:\n\n  Context - It contains the action which will change depending on the current state. When called this action, it will delegate into the State object saved.\n  State Interface - Contains the design of the action. The context will save this raw.\n  Concrete States - Each one extends the interface and will override the action &amp; its results.\n\n\nMemento\nAllows to restore an object to a previous state. It makes snapshots of the object and saves them, allowing later to restore any of them.\nBehaviour pattern. It does save snapshots of a class, to be able to recover a previous state of an object.\nParts:\n\n  Originator - Class from which we save its states. e.g. a DTO.\n  Memento - It’s a Snapshot which saves the content of the Originator in a punctual state.\n  Caretaker - Class where we do save the several Mementos. From it we do save or load Mementos.\n\n\n\nCreational\nBuilder\nAllows to create beans easily (and fluently) for cases where we have lots of parameters (+4-5), with some of them required and others optional.\n\nFactory\nUses factory methods to add an abstraction layout. Allows for example to be able to connect to several databases doing the swap by just changing two parameters in a config file.\n",
      tags: [],
      id: 33
    });
    


var store = [{
    "title": "Advanced Bash / Zsh",
    "link": "/notes/technologies/linux-bash-zsh",
    "image": null,
    "date": "September 16, 2019",
    "category": null,
    "excerpt": "General, useful things curl cheat.sh/command_to_search shows a cheatsheet with options for this command (move this into another post. I don’t..."
},{
    "title": "Kotlin experience cheat-sheet",
    "link": "/notes/languages/kotlin",
    "image": null,
    "date": "August 14, 2019",
    "category": null,
    "excerpt": "Mutable vs Inmutable collections Kotlin’s List from the standard library is readonly. This means if we use collections from Java..."
},{
    "title": "Spring CORS",
    "link": "/notes/frameworks/java/spring/cors",
    "image": null,
    "date": "August 13, 2019",
    "category": null,
    "excerpt": "CORS (Cross-Origin Resource Sharing) It’s a mechanism to let a web application running at one domain, protocol or port have..."
},{
    "title": "ReactJS",
    "link": "/notes/frontend/react",
    "image": null,
    "date": "August 11, 2019",
    "category": null,
    "excerpt": "JavaScript library for building user interfaces. Created by Facebook. Yarn JavaScript package manager compatible with npm that helps automate the..."
},{
    "title": "Git CLI",
    "link": "/notes/tools/git",
    "image": null,
    "date": "July 8, 2019",
    "category": null,
    "excerpt": "Config see config git config -l modify username git config --global user.name \"newName\" modify email git config --global user.mail \"new@mail.com\"..."
},{
    "title": "From Java to Kotlin (2/2) - Idioms",
    "link": "/notes/languages/kotlin/from-java-to-kotlin-idioms",
    "image": null,
    "date": "June 16, 2019",
    "category": null,
    "excerpt": "Kotlin’s has built-in support for common java patterns. This are some of them. Create POJOs (Plain Old Java Object) This..."
},{
    "title": "From Java to Kotlin (1/2) - Basic Syntax",
    "link": "/notes/languages/kotlin/from-java-to-kotlin-basic-syntax",
    "image": null,
    "date": "June 14, 2019",
    "category": null,
    "excerpt": "Guide on differences to jump from Java developer to Kotlin developer. Class instantiation No new operator is needed class Whatever..."
},{
    "title": "Generate a builder with Lombok",
    "link": "/notes/frameworks/java/lombok/builders",
    "image": null,
    "date": "June 6, 2019",
    "category": null,
    "excerpt": "Is possible to auto-generate builders for a Java class using @Builder lombok annotation. They’re really simple though and do not..."
},{
    "title": "How to link an intermediary table",
    "link": "/notes/languages/java/link-intermediary-table",
    "image": null,
    "date": "May 28, 2019",
    "category": null,
    "excerpt": "(This was done with MySQL, Hibernate and Lombok) Setting: We have two Entities, Category and Code. Some categories must contain..."
},{
    "title": "Java experience cheat-sheet",
    "link": "/notes/languages/java",
    "image": null,
    "date": "May 23, 2019",
    "category": null,
    "excerpt": "Read files &gt; 1 GB lazily This reads big files (&gt;200 MBs) sequentially and without loading the whole File in..."
},{
    "title": "MySQL User Privileges",
    "link": "/notes/technologies/sql/privileges",
    "image": null,
    "date": "May 22, 2019",
    "category": null,
    "excerpt": "How to grant privileges for a database to a user, when both already exist. In this case the database name..."
},{
    "title": "Kotlin - null safety",
    "link": "/notes/languages/kotlin/null-safety",
    "image": null,
    "date": "May 6, 2019",
    "category": null,
    "excerpt": "Kotlin differences between nullable and non-nullable references var nonNullable: String = \"Hello World\" nonNullable = null // compilation error var..."
},{
    "title": "Docker usage",
    "link": "/notes/tools/docker",
    "image": null,
    "date": "May 6, 2019",
    "category": null,
    "excerpt": "Definitions Image Executable package that includes everything needed to run an application. Container Instance of an image. Stack Defines the..."
},{
    "title": "Spring in Action (1/5) - Foundational Spring",
    "link": "/notes/frameworks/java/spring/spring-in-action",
    "image": null,
    "date": "April 3, 2019",
    "category": null,
    "excerpt": "(This are my notes taken from the book Spring in Action 5th Edition) Spring parts Spring core Provides the core..."
},{
    "title": "SQL cheat-sheet",
    "link": "/notes/technologies/sql/queries",
    "image": null,
    "date": "April 2, 2019",
    "category": null,
    "excerpt": "DDL Queries Show all dbs - SHOW DATABASES; Select one - USE {$db}; Show tables in a db - SHOW..."
},{
    "title": "Thymeleaf",
    "link": "/notes/frameworks/java/spring/thymeleaf",
    "image": null,
    "date": "April 1, 2019",
    "category": null,
    "excerpt": "Thymeleaf is an HTML template engine, which provides full Spring support. &lt;h3&gt;Designate your wrap:&lt;h3&gt; &lt;div th:each=\"ingredient: ${wrap}\"&gt; &lt;input name=\"ingredients\" type=\"checkbox\"..."
},{
    "title": "Changes in Java12",
    "link": "/notes/languages/java/java12",
    "image": null,
    "date": "March 29, 2019",
    "category": null,
    "excerpt": "Switch expression It has been revamped to act as an expression. It removes the usage of break. switch(day) { case..."
},{
    "title": "Spring Beans",
    "link": "/notes/frameworks/java/spring/beans",
    "image": null,
    "date": "March 25, 2019",
    "category": null,
    "excerpt": "A spring bean is the basic building block of a Spring App. In its basis, it’s an Object which Spring..."
},{
    "title": "Java11 - Run file as a script",
    "link": "/notes/languages/java/java11/scripting",
    "image": null,
    "date": "March 20, 2019",
    "category": null,
    "excerpt": "(This uses &gt; java11) To run a file as Java, we don’t need to do anything special to the .java..."
},{
    "title": "MongoDB",
    "link": "/notes/technologies/mongo",
    "image": null,
    "date": "March 18, 2019",
    "category": null,
    "excerpt": "Config Config. to run MongoDB Set PATH as system variable (~/.bashrc) Create folders /data/db and set rw- permissions to correct..."
},{
    "title": "SQL - administration",
    "link": "/notes/technologies/sql/administration",
    "image": null,
    "date": "March 18, 2019",
    "category": null,
    "excerpt": "(All this commands are for MySQL) Connection Connect to DB from CLI mysql -u {$user} -p User SELECT CURRENT_USER(); See..."
},{
    "title": "Google advanced queries",
    "link": "/notes/technologies/advanced-search",
    "image": null,
    "date": "March 18, 2019",
    "category": null,
    "excerpt": "Advanced search queries site:stackoverflow.com {$query} search specific site related:{$site} search for a web similar to other one you already know..."
},{
    "title": "Maven",
    "link": "/notes/tools/maven",
    "image": null,
    "date": "March 15, 2019",
    "category": null,
    "excerpt": "Checkstyle To check all the errors in checkstyle and where they’re located: go to the project’s folder where the error..."
},{
    "title": "HateOAS",
    "link": "/notes/technologies/hateoas",
    "image": null,
    "date": "March 14, 2019",
    "category": null,
    "excerpt": "Rest levels Model of restful maturity used to help explain the specific properties of a web-style system. Level 0 The..."
},{
    "title": "Python - cheat sheet",
    "link": "/notes/languages/python",
    "image": null,
    "date": "March 14, 2019",
    "category": null,
    "excerpt": "Pip Usage to install a package python -m pip install flask BeautifulSoup Find all elements of tag def find_tag(self, tag):..."
},{
    "title": "Golang - code cheat sheet",
    "link": "/notes/languages/go/code",
    "image": null,
    "date": "March 14, 2019",
    "category": null,
    "excerpt": "Installation Compile To compile / build / run in Sublime ctrl + shift + P go run Multiple workspaces For..."
},{
    "title": "Golang - installation",
    "link": "/notes/languages/go/installation",
    "image": null,
    "date": "March 14, 2019",
    "category": null,
    "excerpt": "Check installation go version Environment variables GOROOT Folder where go was installated. It must only be set when installing to..."
},{
    "title": "Liquid",
    "link": "/notes/frontend/liquid",
    "image": null,
    "date": "March 6, 2019",
    "category": null,
    "excerpt": "Liquid is a template engine for HTML. It’s used by Jekyll. Variables Usage Declaration in a config.yml file with home_sidebar:..."
},{
    "title": "Jekyll",
    "link": "/notes/frontend/jekyll",
    "image": null,
    "date": "March 6, 2019",
    "category": null,
    "excerpt": "Jekyll is a blog-aware static site generator, written in ruby. It’s used for Github Pages and it transforms files written..."
},{
    "title": "Spring Cache",
    "link": "/notes/frameworks/java/spring/cache",
    "image": null,
    "date": "March 6, 2019",
    "category": null,
    "excerpt": "Spring Cache A cache itself may be imagined as a key-value map. For a basic Cache we need: @EnableCaching tag..."
},{
    "title": "Java frameworks - Vertx notes",
    "link": "/notes/frameworks/java/vertx",
    "image": null,
    "date": "March 6, 2019",
    "category": null,
    "excerpt": "Compile &amp; execute: mvn clean install java -jar target/[substitute_with_name]-fat.jar -cluster Standard vs Worker Verticle Concurrency is handled completely by Vert.x..."
},{
    "title": "Java testing notes",
    "link": "/notes/frameworks/java/testing",
    "image": null,
    "date": "March 6, 2019",
    "category": null,
    "excerpt": "Codearte’s Catch exception The only thing it does, it’s to do a bit easier to test and assert for exceptions..."
},{
    "title": "From Java8 to Java11",
    "link": "/notes/languages/java/java8-to-java11",
    "image": null,
    "date": "March 4, 2019",
    "category": null,
    "excerpt": "This is a list of the changes at Java’s API I found interesting or that I may use frecuently. Not..."
},{
    "title": "Java patterns",
    "link": "/notes/patterns",
    "image": null,
    "date": "March 1, 2019",
    "category": null,
    "excerpt": "Implementation of several patterns in Java, which may be used as future example on how to technically implement them. Database..."
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