# Revised Enumeration of Rest API endpoints

(Compare to: [current version](../endpoints_enumerated.md))

Organized by client JS file that accesses the endpoint.

<table>

  <tr>
    <th>Path</th>
    <th>Method</th>
    <th>Sample params</th>
    <th>Sample response</th>
    <th>Purpose</th>
  </tr>

  <tr>
    <th colspan="4">core/src/main/web/app/helpers/helper.js</th>
  </tr>
  <tr>
    <td>/beaker/rest/plugin-services/:id</td>
    <td>POST</td>
    <td>
      (none)
    </td>
    <td>
      OK
    </td>
    <td>
    * locate the service that matches the plugin ID
    <br/>
         * @param pluginId e.g. "python"
    <br/>
         * @return confirmation that the service is running
    </td>
  </tr>

  <tr>
    <th colspan="4">core/src/main/web/app/mainapp/components/notebook/notebook-directive.js</th>
  </tr>
  <tr>
    <td>/beaker/rest/outputlog/clear</td>
    <td>GET</td>
    <td></td>
    <td></td>
    <td>Clears the output log from the display (it's aggregated on the server)</td>
  </tr>

  <tr>
    <th colspan="4">core/src/main/web/app/utils/outputlog.js</th>
  </tr>
  <tr>
    <td>/beaker/rest/outputlog/get</td>
    <td>GET</td>
    <td></td>
    <td>? bunsen never requests</td>
    <td>Gets the accumulated output log</td>
  </tr>

  <tr>
    <th colspan="4">core/src/main/web/app/utils/session.js</th>
  </tr>
  <tr>
    <td>/beaker/rest/session-backup/backup/:id</td>
    <td>POST</td>
    <td>
      * notebookModelJson: actual notebook contents
      * edited:false
    </td>
    <td></td>
  </tr>

  <tr>
    <td>/beaker/rest/session-backup/load</td>
    <td>GET</td>
    <td>sessionId=183</td>
    <td>(notebook contents)</td>
    <td>Loads the actual notebook contents from a session backup so that the
      notebook can be rendered.
    </td>
  </tr>


</table>
