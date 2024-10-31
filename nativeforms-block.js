(function (blocks, editor, i18n, element, components, _) {
  var __ = i18n.__;
  var el = element.createElement;
  var RichText = editor.RichText;
  var MediaUpload = editor.MediaUpload;
  var TextInput = editor.TextInput;

  function generateRandomString(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const iconEl = el(
    "svg",
    { width: 20, height: 20, viewBox: "0 0 256 256" },
    el(
      "g",
      { fill: "#20f" },
      el("path", {
        d: "m31 0h195c8 1 16 5 21 10s8 13 9 21v194c-1 9-5 18-12 24-5 4-12 6-19 7h-194c-7-1-14-3-20-7-6-6-10-15-11-24v-194c1-8 4-16 9-21 6-6 13-10 22-10m136 47c-17 3-33 12-44 25l-21 23c-1 2-4 5-7 4-7-1-14-4-21-3-7 0-12 4-17 8l-10 6c-2 3-1 8 3 10l31 19 6 3c4 0 7-3 7-7 0-3-2-5-4-6l-24-15c3-2 7-5 11-5 6 0 11 3 16 3 7 2 14-1 18-6l18-21c10-11 22-21 37-24 10-2 20-1 30-1v17c0 11-3 23-9 33-4 6-10 11-16 16l-21 19c-4 4-7 10-7 16 1 6 4 12 4 18 0 4-3 8-5 11l-14-24c-2-2-3-4-6-4-4 0-7 3-8 6l2 7 19 31c2 3 5 5 8 4s5-4 7-6c4-7 9-13 10-21 2-8-2-15-3-22-1-3 2-6 4-8l23-20c13-11 22-26 25-43 2-10 1-21 1-32 0-3 1-7-2-10s-7-2-10-2c-10 0-21-1-31 1m-24 45c-3 8 1 17 8 21 9 4 20 0 23-9 2-4 3-9-1-12-2-2-6-1-9 0 2-4 2-10-3-11-7-2-16 3-18 11m-17 30-4 2a7440 7440 0 0 1-35 38c0 4 4 8 8 7 2 0 3-2 5-3l32-33c2-1 3-4 3-6-1-4-6-7-9-5m-63 27-11 11c-3 3-7 6-6 10 1 5 7 8 11 5l12-12c2-2 5-5 4-8 0-5-6-8-10-6m7 28-20 20c-2 1-4 3-4 5-1 4 4 9 8 8 2 0 4-3 6-4l18-18c2-2 3-6 1-8-1-4-5-5-9-3m27 7-11 11c-3 2-6 5-6 9 1 5 7 8 11 5l12-12c2-2 5-5 4-9 0-4-6-7-10-4z",
      }),
      el("path", { d: "m156 95 8-3-3 7c-2 4-8 0-5-4z" })
    ),
    el(
      "g",
      { fill: "#fff" },
      el("path", {
        d: "M167 47c10-2 21-1 31-1 3 0 7-1 10 2s2 7 2 10c0 11 1 22-1 32-3 17-12 32-25 43l-23 20c-2 2-5 5-4 8 1 7 5 14 3 22-1 8-6 14-10 21-2 2-4 5-7 6s-6-1-8-4l-19-31-2-7c1-3 4-6 8-6 3 0 4 2 6 4l14 24c2-3 5-7 5-11 0-6-3-12-4-18 0-6 3-12 7-16l21-19c6-5 12-10 16-16 6-10 9-22 9-33V60c-10 0-20-1-30 1-15 3-27 13-37 24l-18 21c-4 5-11 8-18 6-5 0-10-3-16-3-4 0-8 3-11 5l24 15c2 1 4 3 4 6 0 4-3 7-7 7l-6-3-31-19c-4-2-5-7-3-10l10-6c5-4 10-8 17-8 7-1 14 2 21 3 3 1 6-2 7-4l21-23c11-13 27-22 44-25z",
      }),
      el("path", {
        d: "m143 92c2-8 11-13 18-11 5 1 5 7 3 11 3-1 7-2 9 0 4 3 3 8 1 12-3 9-14 13-23 9-7-4-11-13-8-21m13 3c-3 4 3 8 5 4l3-7-8 3zm-30 27c3-2 8 1 9 5 0 2-1 5-3 6l-32 33c-2 1-3 3-5 3-4 1-8-3-8-7l3-6 32-32 4-2zm-63 27c4-2 10 1 10 6 1 3-2 6-4 8l-12 12c-4 3-10 0-11-5-1-4 3-7 6-10l11-11zm7 28c4-2 8-1 9 3 2 2 1 6-1 8l-18 18c-2 1-4 4-6 4-4 1-9-4-8-8a1704 1704 0 0 0 21-22l3-3zm27 7c4-3 10 0 10 4 1 4-2 7-4 9l-12 12c-4 3-10 0-11-5 0-4 3-7 6-9l11-11z",
      })
    )
  );

  blocks.registerBlockType("dodel/nativeforms-block", {
    title: __("NativeForms", "dodel"),
    icon: iconEl,
    category: "common",
    attributes: {
      title: {
        type: "string",
      },
    },
    innerBlocks: [],
    edit: function (props) {
      const frame = generateRandomString(6);
      window.addEventListener("message", (m) => {
        let data = {};
        if (typeof m.data == "string" && m.data.indexOf("!") != 0) {
          data = JSON.parse(m.data);
        } else {
          data = {};
        }
        if (typeof data.id !== "undefined" && data.id !== "") {
          if (data.frame === frame) {
            props.setAttributes({ title: data.id });
          }
        }
      });
      var attributes = props.attributes;
      if (
        attributes.title != "" &&
        typeof attributes.title != "undefined" &&
        Object.keys(attributes).length > 0
      ) {
        return el(
          "div",
          null,
          React.createElement(
            "div",
            {
              style: {
                padding: "10px",
                backgroundColor: "rgb(253, 253, 255)",
                border: "1px solid #777",
                borderBottom: "none",
              },
            },
            React.createElement("img", {
              src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB2ZXJzaW9uPSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiMyMGYiPjxwYXRoIGQ9Ik0zMSAwaDE5NWM4IDEgMTYgNSAyMSAxMHM4IDEzIDkgMjF2MTk0Yy0xIDktNSAxOC0xMiAyNC01IDQtMTIgNi0xOSA3SDMxYy03LTEtMTQtMy0yMC03LTYtNi0xMC0xNS0xMS0yNFYzMWMxLTggNC0xNiA5LTIxQzE1IDQgMjIgMCAzMSAwbTEzNiA0N2MtMTcgMy0zMyAxMi00NCAyNWwtMjEgMjNjLTEgMi00IDUtNyA0LTctMS0xNC00LTIxLTMtNyAwLTEyIDQtMTcgOGwtMTAgNmMtMiAzLTEgOCAzIDEwbDMxIDE5IDYgM2M0IDAgNy0zIDctNyAwLTMtMi01LTQtNmwtMjQtMTVjMy0yIDctNSAxMS01IDYgMCAxMSAzIDE2IDMgNyAyIDE0LTEgMTgtNmwxOC0yMWMxMC0xMSAyMi0yMSAzNy0yNCAxMC0yIDIwLTEgMzAtMXYxN2MwIDExLTMgMjMtOSAzMy00IDYtMTAgMTEtMTYgMTZsLTIxIDE5Yy00IDQtNyAxMC03IDE2IDEgNiA0IDEyIDQgMTggMCA0LTMgOC01IDExbC0xNC0yNGMtMi0yLTMtNC02LTQtNCAwLTcgMy04IDZsMiA3IDE5IDMxYzIgMyA1IDUgOCA0czUtNCA3LTZjNC03IDktMTMgMTAtMjEgMi04LTItMTUtMy0yMi0xLTMgMi02IDQtOGwyMy0yMGMxMy0xMSAyMi0yNiAyNS00MyAyLTEwIDEtMjEgMS0zMiAwLTMgMS03LTItMTBzLTctMi0xMC0yYy0xMCAwLTIxLTEtMzEgMW0tMjQgNDVjLTMgOCAxIDE3IDggMjEgOSA0IDIwIDAgMjMtOSAyLTQgMy05LTEtMTItMi0yLTYtMS05IDAgMi00IDItMTAtMy0xMS03LTItMTYgMy0xOCAxMW0tMTcgMzBsLTQgMmE3NDQwIDc0NDAgMCAwIDEtMzUgMzhjMCA0IDQgOCA4IDcgMiAwIDMtMiA1LTNsMzItMzNjMi0xIDMtNCAzLTYtMS00LTYtNy05LTVtLTYzIDI3bC0xMSAxMWMtMyAzLTcgNi02IDEwIDEgNSA3IDggMTEgNWwxMi0xMmMyLTIgNS01IDQtOCAwLTUtNi04LTEwLTZtNyAyOGwtMyAzLTE3IDE3Yy0yIDEtNCAzLTQgNS0xIDQgNCA5IDggOCAyIDAgNC0zIDYtNGwxOC0xOGMyLTIgMy02IDEtOC0xLTQtNS01LTktM20yNyA3bC0xMSAxMWMtMyAyLTYgNS02IDkgMSA1IDcgOCAxMSA1bDEyLTEyYzItMiA1LTUgNC05IDAtNC02LTctMTAtNHoiLz48cGF0aCBkPSJNMTU2IDk1bDgtMy0zIDdjLTIgNC04IDAtNS00eiIvPjwvZz48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMTY3IDQ3YzEwLTIgMjEtMSAzMS0xIDMgMCA3LTEgMTAgMnMyIDcgMiAxMGMwIDExIDEgMjItMSAzMi0zIDE3LTEyIDMyLTI1IDQzbC0yMyAyMGMtMiAyLTUgNS00IDggMSA3IDUgMTQgMyAyMi0xIDgtNiAxNC0xMCAyMS0yIDItNCA1LTcgNnMtNi0xLTgtNGwtMTktMzEtMi03YzEtMyA0LTYgOC02IDMgMCA0IDIgNiA0bDE0IDI0YzItMyA1LTcgNS0xMSAwLTYtMy0xMi00LTE4IDAtNiAzLTEyIDctMTZsMjEtMTljNi01IDEyLTEwIDE2LTE2IDYtMTAgOS0yMiA5LTMzVjYwYy0xMCAwLTIwLTEtMzAgMS0xNSAzLTI3IDEzLTM3IDI0bC0xOCAyMWMtNCA1LTExIDgtMTggNi01IDAtMTAtMy0xNi0zLTQgMC04IDMtMTEgNWwyNCAxNWMyIDEgNCAzIDQgNiAwIDQtMyA3LTcgN2wtNi0zLTMxLTE5Yy00LTItNS03LTMtMTBsMTAtNmM1LTQgMTAtOCAxNy04IDctMSAxNCAyIDIxIDMgMyAxIDYtMiA3LTRsMjEtMjNjMTEtMTMgMjctMjIgNDQtMjV6Ii8+PHBhdGggZD0iTTE0MyA5MmMyLTggMTEtMTMgMTgtMTEgNSAxIDUgNyAzIDExIDMtMSA3LTIgOSAwIDQgMyAzIDggMSAxMi0zIDktMTQgMTMtMjMgOS03LTQtMTEtMTMtOC0yMW0xMyAzYy0zIDQgMyA4IDUgNGwzLTctOCAzek0xMjYgMTIyYzMtMiA4IDEgOSA1IDAgMi0xIDUtMyA2bC0zMiAzM2MtMiAxLTMgMy01IDMtNCAxLTgtMy04LTdsMy02IDMyLTMyIDQtMnpNNjMgMTQ5YzQtMiAxMCAxIDEwIDYgMSAzLTIgNi00IDhsLTEyIDEyYy00IDMtMTAgMC0xMS01LTEtNCAzLTcgNi0xMGwxMS0xMXpNNzAgMTc3YzQtMiA4LTEgOSAzIDIgMiAxIDYtMSA4bC0xOCAxOGMtMiAxLTQgNC02IDQtNCAxLTktNC04LThhMTcwNCAxNzA0IDAgMCAwIDIxLTIybDMtM3pNOTcgMTg0YzQtMyAxMCAwIDEwIDQgMSA0LTIgNy00IDlsLTEyIDEyYy00IDMtMTAgMC0xMS01IDAtNCAzLTcgNi05bDExLTExeiIvPjwvZz48L3N2Zz4=",
            }),
            React.createElement(
              "span",
              {
                style: {
                  marginLeft: "10px",
                  fontWeight: "bold",
                  fontSize: "14px",
                },
              },
              "NativeForms"
            )
          ),
          React.createElement(
            "div",
            {
              style: {
                padding: "0px",
                backgroundColor: "rgb(253, 253, 255)",
                textAlign: "center",
                border: "1px solid #777",
                borderTop: "none",
              },
              alt: props.attributes.title,
              className: "block-of-form",
            },
            React.createElement(
              "iframe",
              {
                className: "nf-resizable-form",
                width: "100%",
                height: "600",
                frameBorder: "0",
                src: "https://form.nativeforms.com/" + props.attributes.title,
              },
              ""
            )
          )
        );
      } else {
        return el(
          "div",
          {
            style: {
              padding: "10px",
              backgroundColor: "rgb(253, 253, 255)",
              border: "1px solid #777",
            },
          },
          React.createElement(
            "div",
            null,
            React.createElement("img", {
              src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB2ZXJzaW9uPSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiMyMGYiPjxwYXRoIGQ9Ik0zMSAwaDE5NWM4IDEgMTYgNSAyMSAxMHM4IDEzIDkgMjF2MTk0Yy0xIDktNSAxOC0xMiAyNC01IDQtMTIgNi0xOSA3SDMxYy03LTEtMTQtMy0yMC03LTYtNi0xMC0xNS0xMS0yNFYzMWMxLTggNC0xNiA5LTIxQzE1IDQgMjIgMCAzMSAwbTEzNiA0N2MtMTcgMy0zMyAxMi00NCAyNWwtMjEgMjNjLTEgMi00IDUtNyA0LTctMS0xNC00LTIxLTMtNyAwLTEyIDQtMTcgOGwtMTAgNmMtMiAzLTEgOCAzIDEwbDMxIDE5IDYgM2M0IDAgNy0zIDctNyAwLTMtMi01LTQtNmwtMjQtMTVjMy0yIDctNSAxMS01IDYgMCAxMSAzIDE2IDMgNyAyIDE0LTEgMTgtNmwxOC0yMWMxMC0xMSAyMi0yMSAzNy0yNCAxMC0yIDIwLTEgMzAtMXYxN2MwIDExLTMgMjMtOSAzMy00IDYtMTAgMTEtMTYgMTZsLTIxIDE5Yy00IDQtNyAxMC03IDE2IDEgNiA0IDEyIDQgMTggMCA0LTMgOC01IDExbC0xNC0yNGMtMi0yLTMtNC02LTQtNCAwLTcgMy04IDZsMiA3IDE5IDMxYzIgMyA1IDUgOCA0czUtNCA3LTZjNC03IDktMTMgMTAtMjEgMi04LTItMTUtMy0yMi0xLTMgMi02IDQtOGwyMy0yMGMxMy0xMSAyMi0yNiAyNS00MyAyLTEwIDEtMjEgMS0zMiAwLTMgMS03LTItMTBzLTctMi0xMC0yYy0xMCAwLTIxLTEtMzEgMW0tMjQgNDVjLTMgOCAxIDE3IDggMjEgOSA0IDIwIDAgMjMtOSAyLTQgMy05LTEtMTItMi0yLTYtMS05IDAgMi00IDItMTAtMy0xMS03LTItMTYgMy0xOCAxMW0tMTcgMzBsLTQgMmE3NDQwIDc0NDAgMCAwIDEtMzUgMzhjMCA0IDQgOCA4IDcgMiAwIDMtMiA1LTNsMzItMzNjMi0xIDMtNCAzLTYtMS00LTYtNy05LTVtLTYzIDI3bC0xMSAxMWMtMyAzLTcgNi02IDEwIDEgNSA3IDggMTEgNWwxMi0xMmMyLTIgNS01IDQtOCAwLTUtNi04LTEwLTZtNyAyOGwtMyAzLTE3IDE3Yy0yIDEtNCAzLTQgNS0xIDQgNCA5IDggOCAyIDAgNC0zIDYtNGwxOC0xOGMyLTIgMy02IDEtOC0xLTQtNS01LTktM20yNyA3bC0xMSAxMWMtMyAyLTYgNS02IDkgMSA1IDcgOCAxMSA1bDEyLTEyYzItMiA1LTUgNC05IDAtNC02LTctMTAtNHoiLz48cGF0aCBkPSJNMTU2IDk1bDgtMy0zIDdjLTIgNC04IDAtNS00eiIvPjwvZz48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMTY3IDQ3YzEwLTIgMjEtMSAzMS0xIDMgMCA3LTEgMTAgMnMyIDcgMiAxMGMwIDExIDEgMjItMSAzMi0zIDE3LTEyIDMyLTI1IDQzbC0yMyAyMGMtMiAyLTUgNS00IDggMSA3IDUgMTQgMyAyMi0xIDgtNiAxNC0xMCAyMS0yIDItNCA1LTcgNnMtNi0xLTgtNGwtMTktMzEtMi03YzEtMyA0LTYgOC02IDMgMCA0IDIgNiA0bDE0IDI0YzItMyA1LTcgNS0xMSAwLTYtMy0xMi00LTE4IDAtNiAzLTEyIDctMTZsMjEtMTljNi01IDEyLTEwIDE2LTE2IDYtMTAgOS0yMiA5LTMzVjYwYy0xMCAwLTIwLTEtMzAgMS0xNSAzLTI3IDEzLTM3IDI0bC0xOCAyMWMtNCA1LTExIDgtMTggNi01IDAtMTAtMy0xNi0zLTQgMC04IDMtMTEgNWwyNCAxNWMyIDEgNCAzIDQgNiAwIDQtMyA3LTcgN2wtNi0zLTMxLTE5Yy00LTItNS03LTMtMTBsMTAtNmM1LTQgMTAtOCAxNy04IDctMSAxNCAyIDIxIDMgMyAxIDYtMiA3LTRsMjEtMjNjMTEtMTMgMjctMjIgNDQtMjV6Ii8+PHBhdGggZD0iTTE0MyA5MmMyLTggMTEtMTMgMTgtMTEgNSAxIDUgNyAzIDExIDMtMSA3LTIgOSAwIDQgMyAzIDggMSAxMi0zIDktMTQgMTMtMjMgOS03LTQtMTEtMTMtOC0yMW0xMyAzYy0zIDQgMyA4IDUgNGwzLTctOCAzek0xMjYgMTIyYzMtMiA4IDEgOSA1IDAgMi0xIDUtMyA2bC0zMiAzM2MtMiAxLTMgMy01IDMtNCAxLTgtMy04LTdsMy02IDMyLTMyIDQtMnpNNjMgMTQ5YzQtMiAxMCAxIDEwIDYgMSAzLTIgNi00IDhsLTEyIDEyYy00IDMtMTAgMC0xMS01LTEtNCAzLTcgNi0xMGwxMS0xMXpNNzAgMTc3YzQtMiA4LTEgOSAzIDIgMiAxIDYtMSA4bC0xOCAxOGMtMiAxLTQgNC02IDQtNCAxLTktNC04LThhMTcwNCAxNzA0IDAgMCAwIDIxLTIybDMtM3pNOTcgMTg0YzQtMyAxMCAwIDEwIDQgMSA0LTIgNy00IDlsLTEyIDEyYy00IDMtMTAgMC0xMS01IDAtNCAzLTcgNi05bDExLTExeiIvPjwvZz48L3N2Zz4=",
            }),
            React.createElement(
              "span",
              {
                style: {
                  marginLeft: "10px",
                  fontWeight: "bold",
                  fontSize: "14px",
                },
              },
              "Select NativeForm"
            )
          ),
          React.createElement("iframe", {
            className: props.className,
            style: { height: "320px" },
            src: "https://app.nativeforms.com/wordpress?frame=" + frame,
          })
        );
      }
    },
    save: function (props) {
      var attributes = props.attributes;
      return el(
        "div",
        null,
        React.createElement(
          "div",
          {
            style: {
              padding: "10px",
              backgroundColor: "rgb(253, 253, 255)",
              border: "1px solid #777",
              borderBottom: "none",
            },
            alt: props.attributes.title,
            className: "block-of-form",
          },
          React.createElement("img", {
            src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB2ZXJzaW9uPSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiMyMGYiPjxwYXRoIGQ9Ik0zMSAwaDE5NWM4IDEgMTYgNSAyMSAxMHM4IDEzIDkgMjF2MTk0Yy0xIDktNSAxOC0xMiAyNC01IDQtMTIgNi0xOSA3SDMxYy03LTEtMTQtMy0yMC03LTYtNi0xMC0xNS0xMS0yNFYzMWMxLTggNC0xNiA5LTIxQzE1IDQgMjIgMCAzMSAwbTEzNiA0N2MtMTcgMy0zMyAxMi00NCAyNWwtMjEgMjNjLTEgMi00IDUtNyA0LTctMS0xNC00LTIxLTMtNyAwLTEyIDQtMTcgOGwtMTAgNmMtMiAzLTEgOCAzIDEwbDMxIDE5IDYgM2M0IDAgNy0zIDctNyAwLTMtMi01LTQtNmwtMjQtMTVjMy0yIDctNSAxMS01IDYgMCAxMSAzIDE2IDMgNyAyIDE0LTEgMTgtNmwxOC0yMWMxMC0xMSAyMi0yMSAzNy0yNCAxMC0yIDIwLTEgMzAtMXYxN2MwIDExLTMgMjMtOSAzMy00IDYtMTAgMTEtMTYgMTZsLTIxIDE5Yy00IDQtNyAxMC03IDE2IDEgNiA0IDEyIDQgMTggMCA0LTMgOC01IDExbC0xNC0yNGMtMi0yLTMtNC02LTQtNCAwLTcgMy04IDZsMiA3IDE5IDMxYzIgMyA1IDUgOCA0czUtNCA3LTZjNC03IDktMTMgMTAtMjEgMi04LTItMTUtMy0yMi0xLTMgMi02IDQtOGwyMy0yMGMxMy0xMSAyMi0yNiAyNS00MyAyLTEwIDEtMjEgMS0zMiAwLTMgMS03LTItMTBzLTctMi0xMC0yYy0xMCAwLTIxLTEtMzEgMW0tMjQgNDVjLTMgOCAxIDE3IDggMjEgOSA0IDIwIDAgMjMtOSAyLTQgMy05LTEtMTItMi0yLTYtMS05IDAgMi00IDItMTAtMy0xMS03LTItMTYgMy0xOCAxMW0tMTcgMzBsLTQgMmE3NDQwIDc0NDAgMCAwIDEtMzUgMzhjMCA0IDQgOCA4IDcgMiAwIDMtMiA1LTNsMzItMzNjMi0xIDMtNCAzLTYtMS00LTYtNy05LTVtLTYzIDI3bC0xMSAxMWMtMyAzLTcgNi02IDEwIDEgNSA3IDggMTEgNWwxMi0xMmMyLTIgNS01IDQtOCAwLTUtNi04LTEwLTZtNyAyOGwtMyAzLTE3IDE3Yy0yIDEtNCAzLTQgNS0xIDQgNCA5IDggOCAyIDAgNC0zIDYtNGwxOC0xOGMyLTIgMy02IDEtOC0xLTQtNS01LTktM20yNyA3bC0xMSAxMWMtMyAyLTYgNS02IDkgMSA1IDcgOCAxMSA1bDEyLTEyYzItMiA1LTUgNC05IDAtNC02LTctMTAtNHoiLz48cGF0aCBkPSJNMTU2IDk1bDgtMy0zIDdjLTIgNC04IDAtNS00eiIvPjwvZz48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMTY3IDQ3YzEwLTIgMjEtMSAzMS0xIDMgMCA3LTEgMTAgMnMyIDcgMiAxMGMwIDExIDEgMjItMSAzMi0zIDE3LTEyIDMyLTI1IDQzbC0yMyAyMGMtMiAyLTUgNS00IDggMSA3IDUgMTQgMyAyMi0xIDgtNiAxNC0xMCAyMS0yIDItNCA1LTcgNnMtNi0xLTgtNGwtMTktMzEtMi03YzEtMyA0LTYgOC02IDMgMCA0IDIgNiA0bDE0IDI0YzItMyA1LTcgNS0xMSAwLTYtMy0xMi00LTE4IDAtNiAzLTEyIDctMTZsMjEtMTljNi01IDEyLTEwIDE2LTE2IDYtMTAgOS0yMiA5LTMzVjYwYy0xMCAwLTIwLTEtMzAgMS0xNSAzLTI3IDEzLTM3IDI0bC0xOCAyMWMtNCA1LTExIDgtMTggNi01IDAtMTAtMy0xNi0zLTQgMC04IDMtMTEgNWwyNCAxNWMyIDEgNCAzIDQgNiAwIDQtMyA3LTcgN2wtNi0zLTMxLTE5Yy00LTItNS03LTMtMTBsMTAtNmM1LTQgMTAtOCAxNy04IDctMSAxNCAyIDIxIDMgMyAxIDYtMiA3LTRsMjEtMjNjMTEtMTMgMjctMjIgNDQtMjV6Ii8+PHBhdGggZD0iTTE0MyA5MmMyLTggMTEtMTMgMTgtMTEgNSAxIDUgNyAzIDExIDMtMSA3LTIgOSAwIDQgMyAzIDggMSAxMi0zIDktMTQgMTMtMjMgOS03LTQtMTEtMTMtOC0yMW0xMyAzYy0zIDQgMyA4IDUgNGwzLTctOCAzek0xMjYgMTIyYzMtMiA4IDEgOSA1IDAgMi0xIDUtMyA2bC0zMiAzM2MtMiAxLTMgMy01IDMtNCAxLTgtMy04LTdsMy02IDMyLTMyIDQtMnpNNjMgMTQ5YzQtMiAxMCAxIDEwIDYgMSAzLTIgNi00IDhsLTEyIDEyYy00IDMtMTAgMC0xMS01LTEtNCAzLTcgNi0xMGwxMS0xMXpNNzAgMTc3YzQtMiA4LTEgOSAzIDIgMiAxIDYtMSA4bC0xOCAxOGMtMiAxLTQgNC02IDQtNCAxLTktNC04LThhMTcwNCAxNzA0IDAgMCAwIDIxLTIybDMtM3pNOTcgMTg0YzQtMyAxMCAwIDEwIDQgMSA0LTIgNy00IDlsLTEyIDEyYy00IDMtMTAgMC0xMS01IDAtNCAzLTcgNi05bDExLTExeiIvPjwvZz48L3N2Zz4=",
          }),
          React.createElement(
            "span",
            {
              style: {
                marginLeft: "10px",
                fontWeight: "bold",
                fontSize: "14px",
              },
            },
            "NativeForms"
          )
        ),
        React.createElement(
          "div",
          {
            style: {
              padding: "0px",
              backgroundColor: "rgb(253, 253, 255)",
              textAlign: "center",
              border: "1px solid #777",
              borderTop: "none",
            },
          },
          React.createElement(
            "iframe",
            {
              className: "nf-resizable-form",
              width: "100%",
              height: "600",
              frameBorder: "0",
              src: "https://form.nativeforms.com/" + props.attributes.title,
            },
            ""
          )
        )
      );
    },
  });
})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.i18n,
  window.wp.element,
  window.wp.components,
  window._
);
