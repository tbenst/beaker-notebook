/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package com.twosigma.beaker.r.serializer;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.rosuda.REngine.REXP;
import org.rosuda.REngine.REXPMismatchException;
import org.rosuda.REngine.REXPReference;
import org.rosuda.REngine.REXPString;
import org.rosuda.REngine.RList;

import java.io.IOException;

public class RJSONConverter {

  public static String toJSON(REXPReference rexp) {
    ObjectMapper mapper = new ObjectMapper();
    String result = "";
    try {
      if (rexp.isLogical()) {
        byte[] byteArray = rexp.resolve().asBytes();
        boolean[] booleans = new boolean[byteArray.length];
        for (int i = 0; i < byteArray.length; i++) {
          booleans[i] = (byteArray[i] == 1);
        }
        result = mapper.writeValueAsString(booleans);
      } else if (rexp.isNumeric()) {
        result = mapper.writeValueAsString(rexp.resolve().asNativeJavaObject());
      } else if (rexp.isString()) {
          result = mapper.writeValueAsString(rexp.asStrings());
      } else if (rexp.isNull()) {
        result = mapper.writeValueAsString(null);
      } else {
        result = mapper.writeValueAsString(rexp.resolve().asNativeJavaObject());
      }
    } catch (REXPMismatchException e) {
      e.printStackTrace();
    } catch (JsonMappingException e) {
      e.printStackTrace();
    } catch (JsonGenerationException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      return result;
    }
  }

  public static REXP fromJSON(REXPReference rexpReference) {
    REXPString result = null;
    try {
      RList rlist = new RList();
      result = new REXPString(rexpReference.asString());
    } catch (REXPMismatchException e) {
      e.printStackTrace();
    } finally {
      return result;
    }
  }

}
