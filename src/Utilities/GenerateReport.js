import { saveAs } from "file-saver";
import { toXML } from "jstoxml";

export function download(caseReports, reportType, caseDetails) {
  const value = caseReports[reportType].map((t, i) => {
    return { transaction: t };
  });

  let indicators = [{ indicator: 1 }, { indicator: 2 }];
  const xmlOptions = {
    header: '<?xml version="1.0" encoding="UTF-8"?>',
  };

  var filename = "report.xml";

  var blob = new Blob(
    [
      toXML(
        {
          report: [
            { rentity_id: "249" },
            { submission_code: "E" },
            { report_code: reportType },
            { entity_reference: "SE107636" },
            { submission_date: new Date() },
            { currency_code_local: "SEK" },
            {
              reporting_person: [
                { first_name: "EWA" },
                { last_name: "Compliance" },
              ],
            },
            { action: caseDetails.Investigation },
            { reason: caseDetails.Conclusion },
            value,
            { report_indicators: [indicators] },
          ],
        },
        xmlOptions
      ),
    ],
    {
      type: "text/xml;charset=utf-8",
    }
  );

  saveAs(blob, filename);
}
