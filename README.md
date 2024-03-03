# WshModeJs

The modern WSH (Windows Script Host) JScript library that mode like Node.js.

[Presentation PDF](https://tuckn.net/assets/20240302T131713JST_promoteWshModeJs-en_pub.pdf)

## tuckn/Wsh series dependency

WshModeJs - This repository  
└─ [WshZLIB](https://github.com/tuckn/WshZLIB)  
&emsp;└─ [WshNet](https://github.com/tuckn/WshNet)  
&emsp;&emsp;└─ [WshChildProcess](https://github.com/tuckn/WshChildProcess)  
&emsp;&emsp;&emsp;└─ [WshProcess](https://github.com/tuckn/WshProcess)  
&emsp;&emsp;&emsp;&emsp;&emsp;└─ [WshFileSystem](https://github.com/tuckn/WshFileSystem)  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;└─ [WshOS](https://github.com/tuckn/WshOS)  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;└─ [WshPath](https://github.com/tuckn/WshPath)  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;└─ [WshUtil](https://github.com/tuckn/WshUtil)  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;└─ [WshPolyfill](https://github.com/tuckn/WshPolyfill)

The upper layer module can use all the functions of the lower layer module.

## Operating environment

Works on JScript in Windows.

## Installation

(1) Create a directory of your WSH project.

```console
D:\> mkdir MyWshProject
D:\> cd MyWshProject
```

(2) Download this ZIP and unzip or Use the following `git` command.

```console
> git clone https://github.com/tuckn/WshModeJs.git ./WshModules/WshModeJs
or
> git submodule add https://github.com/tuckn/WshModeJs.git ./WshModules/WshModeJs
```

(3) Create your JScript (.js) file. For Example,

```console
D:\MyWshProject\
├─ MyScript.js <- Your JScript code will be written in this.
└─ WshModules\
    └─ WshModeJs\
        └─ dist\
          └─ bundle.js
```

I recommend JScript (.js) file encoding to be UTF-8 [BOM, CRLF].

(4) Create your WSF packaging scripts file (.wsf).

```console
D:\MyWshProject\
├─ Run.wsf <- WSH entry file
├─ MyScript.js
└─ WshModules\
    └─ WshModeJs\
        └─ dist\
          └─ bundle.js
```

And you should include _.../dist/bundle.js_ into the WSF file.
For Example, The content of the above _Run.wsf_ is

```xml
<package>
  <job id = "run">
    <script language="JScript" src="./WshModules/WshModeJs/dist/bundle.js"></script>
    <script language="JScript" src="./MyScript.js"></script>
  </job>
</package>
```

I recommend this WSH file (.wsf) encoding to be UTF-8 [BOM, CRLF].

Awesome! This WSH configuration allows you to use the following functions in JScript (_.\\MyScript.js_).

## Usage

Now you can use the following many helpful functions in _.\\MyScript.js_ (JScript).

- [tuckn/WshPolyfill](https://github.com/tuckn/WshPolyfill)
- [tuckn/WshUtil](https://github.com/tuckn/WshUtil)
- [tuckn/WshPath](https://github.com/tuckn/WshPath)
- [tuckn/WshOS](https://github.com/tuckn/WshOS)
- [tuckn/WshFileSystem](https://github.com/tuckn/WshFileSystem)
- [tuckn/WshProcess](https://github.com/tuckn/WshProcess)
- [tuckn/WshChildProcess](https://github.com/tuckn/WshChildProcess)
- [tuckn/WshNet](https://github.com/tuckn/WshNet)
- [tuckn/WshZLIB](https://github.com/tuckn/WshZLIB)

And also, use the following functions.
For Example,

### Readline

```js
var rl = Wsh.Readline; // Shorthand

var answer = rl.questionSync('Are you an engineer?/y or Not');

if (answer.toUpperCase() !== 'Y') return false;

// Now only `questionSync` works...
```

### Buffer (W.I.P)

[Buffer](https://tuckn.net/docs/WshModeJs/Buffer.html) object is defined globally.

```js
var buf = Buffer.from('012345XYZ');

console.log(buf.toString('utf8')); // 012345XYZ
console.log(buf.toString('base64')); // MDEyMzQ1WFla
console.log(buf.toString('hex')); // 30313233343558595a
console.log(buf.values()); // <Buffer 30 31 32 32 ....>

// Now only `from` works...
```

### Http

```js
var http = Wsh.Http; // Shorthand

// Ex 1. Auto JSON parsing
 http.request('https://httpbin.org/ip');
// Returns: { origin: '111.222.333.444' }

// Ex 2. Basic Auth
http.request('https://httpbin.org/basic-auth', { auth: 'myUser:myPasswd' });

// Ex 3. Using proxy
http.request('https://httpbin.org/headers', {
  proxy: {
    host: '192.168.12.34',
    port: 8087,
    proxyAuth: 'proxyUser:proxyPassword'
});
// Returns:
// { headers: {
//     Accept: "\*\/*",
//     Accept-Language: "ja",
//     Host: "httpbin.org",
//     User-Agent: "Mozilla/4.0 (compatible; Win32; WinHttp.WinHttpRequest.5)",
//     X-Amzn-Trace-Id: "Root=1-1234abcd-12345678abcdefg123456789"
//   }
// }

// Ex 4. POST data
http.request('https://httpbin.org/post?argA=valA', {
  method: 'POST',
  dataToSend: 'formB=' + encodeURIComponent('value B')
});
// Returns:
// { args: { argA: "valA" },
//   data: "",
//   files: {},
//   form: { formB: "valB" },
//   headers: { ... },
//   json: null,
//   origin: "111.222.333.444",
//   url: "https://httpbin.org/post?%3FargA=valA" }

// Now only `request` works...
```

## TODO

- Buffer, Http, Readline.

## Documentation

See all specifications [here](https://tuckn.net/docs/WshModeJs/) and also below.

- [WshPolyfill](https://tuckn.net/docs/WshPolyfill/)
- [WshUtil](https://tuckn.net/docs/WshUtil/)
- [WshPath](https://tuckn.net/docs/WshPath/)
- [WshOS](https://tuckn.net/docs/WshOS/)
- [WshFileSystem](https://tuckn.net/docs/WshFileSystem/)
- [WshProcess](https://tuckn.net/docs/WshProcess/)
- [WshChildProcess](https://tuckn.net/docs/WshChildProcess/)
- [WshNet](https://tuckn.net/docs/WshNet/)
- [WshZLIB](https://tuckn.net/docs/WshZLIB/)

## Upper Layer Modules

Please also refer to the more convenient upper-layer modules that use WshModeJs.

- [WshCommander](https://github.com/tuckn/WshCommander)
- [WshConfigStore](https://github.com/tuckn/WshConfigStore)
- [WshDotEnv](https://github.com/tuckn/WshDotEnv)
- [WshLogger](https://github.com/tuckn/WshLogger)

In addition, [WshBasicApps](https://github.com/tuckn/WshBasicPackage) can use all the above modules.

## License

MIT

Copyright (c) 2020 [Tuckn](https://github.com/tuckn)
