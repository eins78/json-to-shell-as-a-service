# `json-to-shell-as-a-service`

A small web service converting `JSON` to `shell` variables.


## API

### `get`

Get a resource from http and convert it.

Example: <http://json2shell.ars.is/get?url=http://api.openweathermap.org/data/2.5/weather?q=Weimar,Germany>
`curl http://json2shell.ars.is/get?url=http://api.maschinenraum.tk/api/v0_12/status.json`

```shell
curl http://json2shell.ars.is/get?url=http://api.openweathermap.org/data/2.5/weather?q=Weimar,Germany > /tmp/weather \
&& source /tmp/weather && say $weather__0__description
```

## Kudos

This is more or less a wrapper around the [bash-vars](https://www.npmjs.org/package/bash-vars) module by @dominictarr.
