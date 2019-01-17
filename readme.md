# A getting starting guide to working the WordPress API

A little JavaScript app put together for the [WPChelt Meetup](https://www.meetup.com/Cheltenham-WordPress-Meetup/) to show how you can intereact with the WordPress API.
** Note: This is a proof of concept and should not to be used in the wild and is 'rough around the edges'!**

- I'm using [Gulp](https://gulpjs.com/) to compile the JavaScript and SASS to CSS.
- It uses [Vue](http://vuejs.org/).
- You'll need a WordPress install to interact with and amend the end point URL accordingly.

## Authorising Requests (Creating, Updating, Deleting) Posts...
### THIS SHOULD ONLY BE USED FOR TESTING PURPOSES. DO NOT USE IN THE WILD!**
You'll need to install this plugin on your WordPress install.
[https://github.com/WP-API/Basic-Auth](https://github.com/WP-API/Basic-Auth)

Then send a base 64 encoded version of your username:password along within the Authorization header.
[https://www.base64encode.org/](https://www.base64encode.org/)

headers: {
   'Authorization': 'Basic YWRtaW46YWRtaW4='
}

