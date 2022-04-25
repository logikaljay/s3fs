# logikaljay/s3fs

<div id="top"></div>

<br />
<div align="center">

  <h3 align="center">logikaljay/s3fs</h3>

  <p align="center">
    Node style promises for s3.
    <br />
    <br />
    <a href="https://github.com/logikaljay/s3fs/issues">Report Bug</a>
    ·
    <a href="https://github.com/logikaljay/s3fs/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li>
          <a href="#examples">Examples</a>
          <ul>
          <li><a href="#typescript-example">TypeScript Example</a></li>
          <li><a href="#esm-example">ESM Example</a></li>
          <li><a href="#cjs-example">CJS Example</a></li>
        </li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Screenshot][product-screenshot]](https://s3fs.logikaljay.vercel.app)

Provide NodeJS style fs/promises for S3.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Built with -->
### Built With

* @aws-sdk/client-s3

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- Getting started -->
## Getting started

### Prerequisites
* node
* npm

### Installation
1. Tell NPM to use GitHub Packages for packages in the @logikaljay organisation (if you haven't already)
    ```bash
    $ npm login --scope=@logikaljay --registry=https://npm.pkg.github.com
    ```
2. Install package
    ```bash
    $ npm i --save @logikaljay/s3fs
    ```

### Examples

#### Create a client

Create a client to communicate with s3

```ts
import { createClient } from "@logikaljay/s3fs"

const client = await createClient({
  endpoint: 'http://localhost:9000',
  credentials: {
    accessKeyId: 'access-key',
    secretAccessKey: 'secret-access-key'
  },
  forcePathStyle: true
})
```

Read files in a directory (bucket)
```ts
import { readdir } from "@logikaljay/s3fs"

// assuming createClient() has already been called somewhere in your code.
let client = await getClient()

let contents = await readdir('bucket-name')

console.log(contents) // array of folders, files

```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Jay Baker - [@logikaljay](https://twitter.com/logikaljay) - logikal@gmail.com

Project Link: [https://github.com/logikaljay/s3fs](https://github.com/logikaljay/s3fs)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [nodejs](https://nodejs.org/en/)
* [@aws-sdk/client-s3](https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-s3)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/logikaljay/s3fs.svg?style=for-the-badge
[contributors-url]: https://github.com/logikaljay/s3fs/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/logikaljay/s3fs.svg?style=for-the-badge
[forks-url]: https://github.com/logikaljay/s3fs/network/members
[stars-shield]: https://img.shields.io/github/stars/logikaljay/s3fs.svg?style=for-the-badge
[stars-url]: https://github.com/logikaljay/s3fs/stargazers
[issues-shield]: https://img.shields.io/github/issues/logikaljay/s3fs.svg?style=for-the-badge
[issues-url]: https://github.com/logikaljay/s3fs/issues
[license-shield]: https://img.shields.io/github/license/logikaljay/s3fs.svg?style=for-the-badge
[license-url]: https://github.com/logikaljay/s3fs/blob/master/LICENSE.txt
[product-screenshot]: https://raw.githubusercontent.com/logikaljay/s3fs/master/screenshot.png