# Enumeration of Rest API endpoints

Organized by client JS file that accesses the endpoint.

## Key

<style>
  .bunsen-will-keep {
    background-color: #ccffcc;
  }
  .bunsen-should-use {
    background-color: #ccccff;
  }
  .bunsen-uses-for-now {
    background-color: #ffffcc;
  }
  .bunsen-will-never-use {
    background-color: #ffcccc;
  }
</style>

<!--div class="bunsen-should-use">Bunsen doesn't use it now, but would benefit
  from using it</div-->
<div class="bunsen-will-keep">Bunsen uses and wants to keep it</div>
<div class="bunsen-uses-for-now">Bunsen uses it, but ideally wouldn't use an
  API like this</div>
<div class="bunsen-will-never-use">Bunsen doesn't use it now, and never will</div>


<table>

  <tr>
    <th>Path</th>
    <th>Method</th>
    <th>Sample params</th>
    <th>Sample response</th>
    <th>Purpose</th>
  </tr>

  <tr>
    <th colspan="4">core/src/main/web/app/beaker.js</th>
  </tr>
  <tr class="bunsen-uses-for-now">
    <td>/beaker/rest/util/getInitPlugins</td>
    <td>GET</td>
    <td></td>
    <td>[ "./plugin/init/track.js", "./plugin/init/addevalplugins.js" ]</td>
    <td>Each item in response is then loaded as a source file.  Can be merged
    with user preferences to extend more load plugins.  </td>
  </tr>
  <tr class="bunsen-uses-for-now">
    <td>/beaker/rest/recent-menu/addItem</td>
    <td>POST</td>
    <td></td>
    <td></td>
    <td>Records that a notebook was opened</td>
  </tr>
  <tr class="bunsen-will-never-use">
    <td>/beaker/rest/recent-menu/getItems</td>
    <td>GET</td>
    <td></td>
    <td>[ "{\"uri\":\"https://bunsen-staging.withmojo.com:443/api/notebooks/183/contents\",\"type\":\"http\"
,\"readOnly\":false,\"format\":\"bkr\"}", "{\"uri\":\"https://bunsen-staging.withmojo.com:443/api/notebooks
/190/contents\",\"type\":\"http\",\"readOnly\":false,\"format\":\"bkr\"}", "{\"uri\":\"https://bunsen-staging
.withmojo.com:443/api/notebooks/187/contents\",\"type\":\"http\",\"readOnly\":false,\"format\":\"bkr
\"}", "{\"uri\":\"https://bunsen-staging.withmojo.com:443/api/notebooks/185/contents\",\"type\":\"http
\",\"readOnly\":false,\"format\":\"bkr\"}" ]</td>
    <td>Returns list of recently opened notebooks</td>
  </tr>
  <tr class="bunsen-will-never-use">
    <td>/beaker/rest/recent-menu/clear</td>
    <td>POST</td>
    <td></td>
    <td></td>
    <td>Clear list of recent notebooks</td>
  </tr>
  <tr class="bunsen-uses-for-now">
    <td>/beaker/rest/util/whoami</td>
    <td>GET</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>

  <tr>
    <th colspan="4">core/src/main/web/app/controlpanel/controlpanel-directive.js</th>
  </tr>
  <tr class="bunsen-will-never-use">
    <td>beaker/rest/util/getControlPanelMenuPlugins</td>
    <td>GET</td>
    <td></td>
    <td></td>
    <td>populates menu on control panel</td>
  </tr>
  <tr class="bunsen-will-never-use">
    <td>beaker/rest/util/isAllowAnonymousTracking</td>
    <td>GET</td>
    <td></td>
    <td></td>
    <td>Reads pref value</td>
  </tr>

  <tr>
    <th colspan="4">core/src/main/web/app/controlpanel/controlpanel-directive.js</th>
  </tr>
  <tr class="bunsen-will-never-use">
    <td>beaker/rest/util/setAllowAnonymousTracking</td>
    <td>POST</td>
    <td></td>
    <td></td>
    <td>Toggles GA on/off</td>
  </tr>

  <tr>
    <th colspan="4">core/src/main/web/app/helpers/cellmenupluginmanager.js</th>
  </tr>
  <tr class="bunsen-uses-for-now">
    <td>/beaker/rest/util/getCellMenuPlugins</td>
    <td>GET</td>
    <td></td>
    <td>[ "./plugin/cellmenu/sharing.js" ]</td>
    <td>Finds additional menu functionality (merged with user preferences).
    Note that the server exposes js routes to add more cell menu plugins, but
    there's no js code that hits that endpoint.</td>
  </tr>

  <tr>
    <th colspan="4">core/src/main/web/app/helpers/core.js</th>
  </tr>
  <tr class="bunsen-will-never-use">
    <td>/beaker/rest/file-io/getDecoratedChildren</td>
    <td>POST</td>
    <td></td>
    <td></td>
    <td>Returns a list of file on the beaker server's filesystem.</td>
  </tr>

  <tr>
    <th colspan="4">core/src/main/web/app/helpers/helper.js</th>
  </tr>
  <tr class="bunsen-uses-for-now">
    <td>/beaker/rest/plugin-services/:id</td>
    <td>GET</td>
    <td>
      command	= ipythonPlugins%2Fipython%2FipythonPlugin
      <br/>
      nginxRules = ipython2
      <br/>
      startedIndicnator = %5BNotebookApp%5D+The+IPython+Notebook+is+running+at:+http:%2F%2F127.0.0.1:
      <br/>
      startedIndicatorStream = stderr
    </td>
    <td>
      ../ipython.207275986589
    </td>
    <td>
         * locate the service that matches the passed-in information about a service and return the
         * base URL the client can use to connect to the target plugin service. If such service
         * doesn't exist, this implementation will also start the service.
         * @param pluginId
         * @param command name of the starting script
         * @param nginxRules rules to help setup nginx proxying
         * @param startedIndicator string indicating that the plugin has started
         * @param startedIndicatorStream stream to search for indicator, null defaults to stdout
         * @param recordOutput boolean, record out/err streams to output log service or not, null defaults to false
         * @param waitfor if record output log service is used, string to wait for before logging starts
         * @return the base url of the service
    </td>
  </tr>

  <tr>
    <th colspan="4">core/src/main/web/app/mainapp/components/notebook/notebook-directive.js</th>
  </tr>
  <tr class="bunsen-will-keep">
    <td>/beaker/rest/outputlog/clear</td>
    <td>GET</td>
    <td></td>
    <td></td>
    <td>Clears the output log from the display (it's aggregated on the server)</td>
  </tr>
  <tr class="bunsen-uses-for-now">
    <td>/beaker/rest/util/isUseAdvancedMode</td>
    <td>GET</td>
    <td></td>
    <td>Empty response</td>
    <td>if false, hide certain UI widgets</td>
  </tr>

  <tr>
    <th colspan="4">core/src/main/web/app/mainapp/mainapp.js</th>
  </tr>
  <tr class="bunsen-will-never-use">
    <td>/beaker/rest/util/getMenuPlugins</td>
    <td>GET</td>
    <td></td>
    <td>[ ]</td>
    <td>Obtain a list of menu plugin js files to load from the server</td>
  </tr>

  <tr>
    <th colspan="4">core/src/main/web/app/utils/outputlog.js</th>
  </tr>
  <tr class="bunsen-will-keep">
    <td>/beaker/rest/outputlog/get</td>
    <td>GET</td>
    <td></td>
    <td>? bunsen never requests</td>
    <td>Gets the accumulated output log</td>
  </tr>

  <tr>
    <th colspan="4">core/src/main/web/app/utils/session.js</th>
  </tr>
  <tr class="bunsen-uses-for-now">
    <td>/beaker/rest/session-backup/backup/:id</td>
    <td>POST</td>
    <td>
      * notebookUri:https://bunsen-staging.withmojo.com:443/api/notebooks/183/contents
      * uriType:http
      * readOnly:false
      * format:bkr
      * notebookModelJson: actual notebook contents
      * edited:false
    </td>
    <td></td>
  </tr>
  <tr class="bunsen-will-never-use">
    <td>/beaker/rest/session-backup/getExistingSessions</td>
    <td>GET</td>
    <td></td>
    <td>(not used by beaker)</td>
    <td>Aquires a list of saved sessions (the desktop analogue of open
      notebooks).</td>
  </tr>
  <tr class="bunsen-uses-for-now">
    <td>/beaker/rest/session-backup/load</td>
    <td>GET</td>
    <td>sessionId=183</td>
    <td>(see [sessions.md](Sessions))</td>
    <td>Loads the actual notebook contents from a session backup so that the
      notebook can be rendered.  An alternative to loading it from a file.
      One difference is that the session backup can also contain evaluator ids
      which correspond to specific plugin processes, e.g. a python backend
      process.
    </td>
  </tr>
  <tr class="bunsen-uses-for-now">
    <td>/beaker/rest/session-backup/close</td>
    <td>POST</td>
    <td></td>
    <td></td>
    <td>Removes session from available backups.</td>
  </tr>
  <tr class="bunsen-will-never-use">
    <td>/beaker/rest/session-backup/addPlugin</td>
    <td>POST</td>
    <td>pluginname, pluginurl</td>
    <td></td>
    <td>Adds to list of available plugins</td>
  </tr>
  <tr class="bunsen-will-never-use">
    <td>/beaker/rest/session-backup/getExistingPlugins</td>
    <td>GET</td>
    <td></td>
    <td></td>
    <td>Gets plugins already added... but this doesn't seem to be actually
      used</td>
  </tr>

  <tr>
    <th colspan="4">core/src/main/web/app/utils/utils.js</th>
  </tr>
  <tr class="bunsen-will-never-use">
    <td>/beaker/rest/file-io/getHomeDirectory</td>
    <td>GET</td>
    <td></td>
    <td></td>
    <td>Used to help build the Beaker file chooser.  Refers to
      a location on server's filesystem. </td>
  </tr>
  <tr class="bunsen-will-never-use">
    <td>/beaker/rest/util/getVersionInfo</td>
    <td>GET</td>
    <td></td>
    <td>{"buildTime": "null", "version":"null"}</td>
    <td>Provides enables converting an old version of .bkr files to
      current.</td>
  </tr>
  <tr class="bunsen-will-never-use">
    <td>/beaker/rest/file-io/getStartUpDirectory</td>
    <td>GET</td>
    <td></td>
    <td></td>
    <td>Used to help build the Beaker file chooser.  Refers to
      a location on server's filesystem. </td>
  </tr>
  <tr class="bunsen-will-never-use">
    <td>/beaker/rest/util/getDefaultNotebook</td>
    <td>GET</td>
    <td></td>
    <td></td>
    <td>Gets the default notebook contents (for creating a new
      notebook).</td>
  </tr>
  <tr class="bunsen-will-never-use">
    <td>/beaker/rest/file-io/load</td>
    <td>GET</td>
    <td></td>
    <td></td>
    <td>Loads a file from local disk.</td>
  </tr>
  <tr class="bunsen-uses-for-now">
    <td>/beaker/rest/http-proxy/load</td>
    <td>GET</td>
    <td></td>
    <td>Actual proxied document</td>
    <td>Loads a resource from the internet (going through proxy to avoid
      tripping browser security issues).</td>
  </tr>
  <tr class="bunsen-will-never-use">
    <td>/beaker/rest/file-io/save</td>
    <td>POST</td>
    <td>path, content</td>
    <td></td>
    <td>Saves a text file to the server's filesystem.  Used for .bkr files.</td>
  </tr>
  <tr class="bunsen-will-never-use">
    <td>/beaker/rest/file-io/saveIfNotExists</td>
    <td>GET</td>
    <td>path, content</td>
    <td></td>
    <td>Saves a text file to the server's filesystem.  Used for .bkr files.
      Won't overwrite existing.</td>
  </tr>

  <tr>
    <th colspan="4">core/src/main/web/plugin/cellmenu/sharing.js</th>
  </tr>
  <tr class="bunsen-will-never-use">
    <td>/beaker/rest/publish/github</td>
    <td>POST</td>
    <td></td>
    <td></td>
    <td>Publishes the notebook to a github gist.  Requires the user's github
      credentials on the server.</td>
  </tr>

  <tr>
    <th colspan="4">plugin/ipythonPlugins/src/dist/ipython/ipython.js</th>
  </tr>
  <tr class="bunsen-uses-for-now">
    <td>/beaker/rest/plugin-services/getIPythonPassword</td>
    <td>GET</td>
    <td>pluginId=IPython</td>
    <td>8ZfZ8e0oE2PjhX7rxcoqb3VdeeGlzRwUyQfUYum4</td>
    <td>This is used to form a secure connection to ipython when it's assumed
      that the connection to beaker server itself is already secure (only
      accepting connections to localhost).  When the plugin is initialized, a
      temporary password is generated.  It sends the password to the
      beaker client and the client then uses that password to connect to the
      server side python process.  A similar mechanism exists for all of the
      other evaluator plugins; each plugin gets its own password.
    </td>
  </tr>
  <tr class="bunsen-uses-for-now">
    <td>beaker/rest/plugin-services/getIPythonVersion</td>
    <td>GET</td>
    <td></td>
    <td>2.3.0</td>
    <td>This is used to detect which version of iPython is installed on the
      server, which in turn affects which client javascript files are loaded
      into the page.  This is useful for client beaker since oftentimes it will
      be installed on a system that already has iPython on it, and it uses the
      existing installation.</td>
  </tr>

</table>
