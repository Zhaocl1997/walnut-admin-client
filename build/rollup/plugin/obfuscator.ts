import obfuscator from 'rollup-plugin-obfuscator'

export const createRollupObfuscatorPlugin = () => {
  return obfuscator({
    fileOptions: {
      optionsPreset: 'high-obfuscation',

      deadCodeInjection: false,
      debugProtection: false,

      stringArrayEncoding: ['base64', 'rc4', 'none'],
      renameProperties: true,
      renamePropertiesMode: 'safe',
      forceTransformStrings: [],
      identifierNamesGenerator: 'mangled-shuffled',
    },
    // fileOptions: {
    //   rotateUnicodeArray: true, // 必须为true

    //   // Compact code output on one line.
    //   compact: true,

    //   // ⚠️ 此选项极大地影响性能，运行时速度降低 1.5 倍。 使用 controlFlowFlatningThreshold 设置将受控制流展平影响的节点的百分比。
    //   // 启用代码控制流扁平化。 控制流扁平化是一种阻碍程序理解的源代码结构转换。
    //   controlFlowFlattening: false,

    //   // controlFlowFlatning 转换将应用于任何给定节点的概率。
    //   // 此设置对于较大的代码量特别有用，因为大量的控制流转换会减慢您的代码并增加代码量。
    //   // controlFlowFlatningThreshold: 0 等于 controlFlowFlatening: false。
    //   controlFlowFlatteningThreshold: 0.8,

    //   // 显着增加混淆代码的大小（高达 200%），仅在混淆代码的大小无关紧要时使用。
    //   // 使用 deadCodeInjectionThreshold 设置受死代码注入影响的节点百分比。
    //   // ⚠️ 此选项强制启用 stringArray 选项。
    //   // 使用此选项，死代码的随机块将被添加到混淆代码中。
    //   deadCodeInjection: false,

    //   // 允许设置将受 deadCodeInjection 影响的节点百分比。
    //   deadCodeInjectionThreshold: 0.5,

    //   // ⚠️ 如果您打开开发者工具，可能会冻结您的浏览器。
    //   // 此选项几乎无法使用开发工具的调试器功能（在基于 WebKit 和 Mozilla Firefox 上）。
    //   debugProtection: false,

    //   // 此选项全局禁用所有脚本的控制台调用
    //   // 通过用空函数替换它们来禁用
    //   // console.log、console.info、console.error、console.warn、console.debug、console.exception 和 console.trace。
    //   // 这使得调试器的使用更加困难。
    //   disableConsoleOutput: true,

    //   // ⚠️ 此选项不适用于目标：'node'
    //   // 允许仅在特定域和/或子域上运行经过混淆的源代码。 这使得人们很难复制和粘贴您的源代码并在其他地方运行它。
    //   // 如果源代码未在此选项指定的域上运行，则浏览器将被重定向到传递给 domainLockRedirectUrl 选项的 URL。
    //   // 多个域和子域
    //   // 可以将您的代码锁定到多个域或子域。
    //   // 例如，要锁定它以使代码仅在 www.example.com 上运行，请添加 www.example.com。
    //   // 要使其在包括任何子域（example.com、sub.example.com）的根域上工作，请使用 .example.com。
    //   domainLock: [],

    //   // 类型：字符串 默认值：十六进制
    //   // 设置标识符名称生成器。
    //   // 可用值：
    //   // dictionary：标识符字典列表中的标识符名称
    //   // hexadecimal：标识符名称，如 _0xabc123
    //   // mangled：短标识符名称，如 a、b、c
    //   // mangled-shuffled：与 mangled 相同，但字母表被打乱
    //   identifierNamesGenerator: 'mangled-shuffled',

    //   // 为所有全局标识符设置前缀。
    //   // 当您想要混淆多个文件时使用此选项。 此选项有助于避免这些文件的全局标识符之间的冲突。 每个文件的前缀应该不同。
    //   identifiersPrefix: '',

    //   // 允许使用源代码设置输入文件的名称。 此名称将在内部用于源映射生成。 使用 NodeJS API 并且 sourceMapSourcesMode 选项具有源值时是必需的。
    //   inputFileName: '',

    //   // Enables logging of the information to the console.
    //   log: false,

    //   // this option can break your code. Enable it only if you know what it does!
    //   // Enables obfuscation of global variable and function names with declaration.
    //   renameGlobals: false,

    //   // 禁用与传递的 RegExp 模式匹配的标识符的混淆和生成。
    //   // 例如，如果添加^ someName，则混淆器将确保以someName开头的所有变量，函数名和函数参数都不会被破坏。
    //   reservedNames: [],

    //   // 字符串文字的禁用转换，它与传递的 RegEx 模式匹配。
    //   // 例如，如果添加^ some * string，则混淆器将确保以某些字符串开头的所有字符串都不会移动到`stringArray`。
    //   reservedStrings: [],

    //   //
    //   rotateStringArray: true,

    //   // 默认情况下（seed = 0），每次混淆代码时都会得到一个新结果（即：不同的变量名，插入stringArray的不同变量等）。
    //   // 如果需要可重复的结果，请将种子设置为特定的整数。
    //   seed: 0,

    //   // ⚠️ 使用此选项进行混淆后，请勿以任何方式更改混淆代码，因为任何像丑化代码这样的更改都会触发自我防御，代码将不再起作用！
    //   // ⚠️ 此选项强制将 compact 值设置为 true
    //   // 此选项使输出代码对格式化和变量重命名具有弹性。
    //   // 如果有人试图在混淆后的代码上使用 JavaScript 美化器，代码将不再工作，从而使其更难理解和修改。
    //   selfDefending: false,

    //   // 为混淆代码启用源映射生成。
    //   // 源映射可以帮助您调试混淆的 JavaScript 源代码。
    //   // 如果您想要或需要在生产中进行调试，您可以将单独的源映射文件上传到一个秘密位置，然后将您的浏览器指向那里。
    //   sourceMap: false,

    //   // Sets base url to the source map import url when sourceMapMode: 'separate'.
    //   sourceMapBaseUrl: '',

    //   // Sets file name for output source map when sourceMapMode: 'separate'.
    //   sourceMapFileName: '',

    //   // Specifies source map generation mode:
    //   // inline - add source map at the end of each .js files;
    //   // separate - generates corresponding '.map' file with source map. In case you run obfuscator through CLI - adds link to source map file to the end of file with obfuscated code //# sourceMappingUrl=file.js.map.
    //   sourceMapMode: 'separate',

    //   // Removes string literals and place them in a special array. For instance, the string "Hello World" in var m = "Hello World";
    //   // will be replaced with something like var m = _0x12c456[0x1];
    //   stringArray: true,

    //   // https://github.com/javascript-obfuscator/javascript-obfuscator#stringarrayencoding
    //   stringArrayEncoding: ['base64'],

    //   // https://github.com/javascript-obfuscator/javascript-obfuscator#stringarraythreshold
    //   stringArrayThreshold: 0.8, // 您可以使用此设置调整字符串文字将插入stringArray的概率（从0到1）。此设置在大型代码库中很有用，因为对stringArray函数的重复调用会降低代码的速度。

    //   // https://github.com/javascript-obfuscator/javascript-obfuscator#target
    //   target: 'browser',

    //   // 转换（混淆）对象键。例如，此代码var a = {enabled：true};
    //   // 使用此选项进行模糊处理时，将隐藏已启用的对象键：var a = {};a [_0x2ae0 [（'0x0'）] = true;。 理想情况下与String Array设置一起使用。
    //   transformObjectKeys: true,

    //   // 将所有字符串转换为其unicode表示形式。例如，字符串“Hello World！”将被转换为“'\ x48 \ x65 \ x6c \ x6c \ x6f \ x20 \ x57 \ x6f \ x72 \ x6c \ x64 \ x21”。
    //   unicodeEscapeSequence: true,

    //   // ... [See more](https://github.com/javascript-obfuscator/javascript-obfuscator)
    // },
  })
}
