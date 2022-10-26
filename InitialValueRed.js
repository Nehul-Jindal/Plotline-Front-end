import { Value } from "slate";

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text:
                  "This is rich text editor made with slate jsThis is rich text editor made with slate jsThis is rich text editor made with slate jsThis is rich text editor made with slate jsThis is rich text editor made with slate js This is rich text editor made with slate js",
              },
            ],
          },
        ],
      },
    ],
  },
});

export default initialValue;
