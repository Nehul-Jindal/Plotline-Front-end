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
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, voluptates earum assumenda nisi odio molestias similique at enim provident fugit, ullam eum. Facere nostrum dolores corrupti quis doloremque aliquid eum reiciendis in, fugiat nisi quisquam ipsam. Illo earum deserunt minus quo? Itaque tempore optio dolorem voluptatem voluptatibus commodi porro, officia nulla pariatur temporibus fugit sunt quod perspiciatis aut quo rem dolor? Voluptatum voluptatem optio at suscipit, aliquam temporibus explicabo, totam ex aspernatur necessitatibus recusandae quaerat vitae? Recusandae, odio! Provident totam rerum, voluptatibus autem mollitia dolores saepe minus nam doloremque quaerat! Quod fuga est assumenda facilis ab ea ex quisquam perferendis. ",
              },
            ],
          },
        ],
      },
    ],
  },
});

export default initialValue;
