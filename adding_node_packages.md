## Adding Node Packages

* Due to security policies that apply to our production infrastructure, we cannot rely on having access to github.
* This means that we can't rely on NPM, since "npm install" will download the source of node libraries, frequently from github.
* So, when you need access to a new node package, rather than simply adding to NPM's "package.json", a system-level apt package needs to be created and included in your Docker container.


* `vagrant ssh`
* `sudo apt-get update`
* `sudo apt-get install -t local nodejs-legacy npm ruby-dev make gcc -y`

> we need to use ruby-dev gcc and make to get dependencies such as mkmf for compiling gems that
that have native extensions such as fpm.

* `npm install <package name>`

* `sudo gem install fpm -v 1.3.0`

> There is a bug in the current release of fpm, https://github.com/jordansissel/fpm/issues/806 so we need to pass the --prefix argument

* `sudo fpm -s npm -t deb --prefix /usr/local  <package_root_path>`

> You should see output like `Created package {:path=>"node-moment_2.8.3_amd64.deb"}`

* Move the build file to the `/vagrant` directory and copy the files from your local disk and send them to Will,

* Add a line to your service's Dockerfile to include the new apt package - it will be one of the packages mentioned near the top in the "apt-get" command.
