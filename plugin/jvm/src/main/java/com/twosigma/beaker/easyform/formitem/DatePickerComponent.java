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

package com.twosigma.beaker.easyform.formitem;

import com.twosigma.beaker.easyform.EasyFormComponent;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DatePickerComponent extends EasyFormComponent {

  private static final String DATE_FORMAT = "yyyyMMdd";
  private static final SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);

  private Boolean showTime;

  public void setShowTime(final Boolean showTime) {
    this.showTime = showTime;
  }

  public Boolean getShowTime() {
    return showTime;
  }

  @Override
  protected boolean checkValue(final Object value) {
    return value instanceof Date || value instanceof String;
  }

  @Override
  public String formatValue(final Object value) {
    if (value instanceof Date) {
      return dateFormat.format(value);
    } else {
      return String.class.cast(value);
    }
  }
}
