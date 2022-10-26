import React, { Component, Fragment } from "react";
import { Editor } from "slate-react";
import { Block, Value } from "slate";
import EditList from "slate-edit-list";
import InitialValue from "../../utils/InitialValueYellow";

import Icon from "react-icons-kit";

import { ic_cloud_upload } from "react-icons-kit/md/";
import { BoldMark, ItalicMark } from "./index";

const schema = {
  document: {
    last: { type: "paragraph" },
    normalize: (editor, { code, node, child }) => {
      switch (code) {
        case "last_child_type_invalid": {
          const paragraph = Block.create("paragraph");
          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
        }
        default:
          return;
      }
    },
  },
  blocks: {
    image: {
      isVoid: true,
    },
  },
};

var plugin = EditList({ types: ["ol_list", "ul_list"] });
const plugins = [plugin];
const maxListDepth = 3;
const orderedListType = ["1", "i", "a"];

export default class CommentEditorRed extends Component {
  state = {
    value: InitialValue,
    blockCountLimitExceeded: false,
  };

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    this.setState({ value });
  };

  call = (callback, listType) => {
    this.setState({
      value: this.state.value.change().call(callback, listType).value,
    });
  };

  onKeyDown = (e, change) => {
    /*
			we want all our commands  to start with the user pressing ctrl,
			if they don't--we cancel the action.
		*/

    if (!e.ctrlKey) {
      return;
    }

    e.preventDefault();

    /* Decide what to do based on the key code... */
    switch (e.key) {
      /* When "b" is pressed, add a "bold" mark to the text. */
      case "b": {
        change.toggleMark("bold");
        return true;
      }
      case "i": {
        change.toggleMark("italic");
        return true;
      }

      case "c": {
        change.toggleMark("code");
        return true;
      }

      case "l": {
        change.toggleMark("list");
        return true;
      }

      case "u": {
        change.toggleMark("underline");
        return true;
      }

      case "q": {
        change.toggleMark("quote");
        return true;
      }

      case "1": {
        change.toggleMark("heading1");
        return true;
      }

      case "2": {
        change.toggleMark("heading2");
        return true;
      }

      case "3": {
        change.toggleMark("heading3");
        return true;
      }

      default: {
        return;
      }
    }
  };

  renderNode = (props, editor, next) => {
    const { attributes, node, isFocused, children } = props;
    const { value } = this.state;
    const isCurrentItem = plugin.utils
      .getItemsAtRange(value.change().value)
      .contains(node);
    var depth = -8;
    var parent = props.children[0]._owner.return;
    while (parent !== null) {
      depth++;
      parent = parent.return;
    }
    depth /= 4;
    switch (node.type) {
      case "image": {
        const src = node.data.get("src");
        return (
          <img
            alt="Uploaded content"
            src={src}
            selected={isFocused}
            {...attributes}
          />
        );
      }
      case "ul_list": {
        if (depth >= maxListDepth) return;
        return (
          <ul {...attributes} depth={depth}>
            {children}
          </ul>
        );
      }
      case "ol_list": {
        if (depth >= maxListDepth) return;
        return (
          <ol {...attributes} type={orderedListType[depth % 3]}>
            {children}
          </ol>
        );
      }
      case "list_item":
        if (depth >= maxListDepth) return;
        return (
          <li
            className={isCurrentItem ? "current-item" : ""}
            title={isCurrentItem ? "Current Item" : ""}
            {...props.attributes}
          >
            {props.children}
          </li>
        );
      default: {
        return;
      }
    }
  };

  renderMark = props => {
    const { value } = this.state;
    switch (props.mark.type) {
      case "bold":
        return <BoldMark {...props} />;

      case "italic":
        return <ItalicMark {...props} />;

      case "code":
        return <code {...props.attributes}>{props.children}</code>;

      case "underline":
        return <u {...props.attributes}>{props.children}</u>;

      case "quote":
        return <blockquote {...props.attributes}>{props.children}</blockquote>;

      case "heading1":
        if (this.hasMark("heading2")) {
          const change = value.change().toggleMark("heading2");
          this.onChange(change);
        } else if (this.hasMark("heading3")) {
          const change = value.change().toggleMark("heading3");
          this.onChange(change);
        }
        if (this.hasMark("heading2") || this.hasMark("heading3"))
          if (props.children.props !== undefined)
            if (props.children.props.children !== undefined)
              return (
                <h1 {...props.attributes}>{props.children.props.children}</h1>
              );
        return <h1 {...props.attributes}>{props.children}</h1>;

      case "heading2":
        if (this.hasMark("heading1")) {
          const change = value.change().toggleMark("heading1");
          this.onChange(change);
        } else if (this.hasMark("heading3")) {
          const change = value.change().toggleMark("heading3");
          this.onChange(change);
        }
        if (this.hasMark("heading1") || this.hasMark("heading3"))
          if (props.children.props !== undefined)
            if (props.children.props.children !== undefined)
              return (
                <h2 {...props.attributes}>{props.children.props.children}</h2>
              );
        return <h2 {...props.attributes}>{props.children}</h2>;

      case "heading3":
        if (this.hasMark("heading2")) {
          const change = value.change().toggleMark("heading2");
          this.onChange(change);
        } else if (this.hasMark("heading1")) {
          const change = value.change().toggleMark("heading1");
          this.onChange(change);
        }
        if (this.hasMark("heading2") || this.hasMark("heading1"))
          if (props.children.props !== undefined)
            if (props.children.props.children !== undefined)
              return (
                <h3 {...props.attributes}>{props.children.props.children}</h3>
              );
        return <h3 {...props.attributes}>{props.children}</h3>;

      default: {
        return;
      }
    }
  };

  hasMark = type => {
    const { value } = this.state;
    if (value === undefined) return null;
    if (value.activeMarks === undefined) return null;
    return value.activeMarks.some(mark => mark.type === type);
  };

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  };

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  };

  onClickImage = event => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change();
    for (const file of event.target.files) {
      const reader = new FileReader();
      const [mime] = file.type.split("/");
      if (mime !== "image") continue;

      reader.onload = e => {
        var src = e.target.result;
        change.insertBlock({
          type: "image",
          data: { src },
        });
        this.onChange(change);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = null;
  };

  onClickImageLink = event => {
    event.preventDefault();
    const src = window.prompt("Enter the URL of the image:");
    if (!src) return;
    this.setState({
      value: this.state.value.change().call(insertImage, src).value,
    });
  };

  onMarkClick = (e, type) => {
    /* disabling browser default behavior like page refresh, etc */
    e.preventDefault();

    /* grabbing the this.state.value */
    const { value } = this.state;

    /*
			applying the formatting on the selected text
			which the desired formatting
		*/
    const change = value.change().toggleMark(type);

    /* calling the  onChange method we declared */
    this.onChange(change);
  };

  renderMarkIcon = (type, icon) => (
    <button
      onPointerDown={e =>
        type === "image" ? this.onClickImageLink(e) : this.onMarkClick(e, type)
      }
      className={
        this.hasMark(type) && type !== "image"
          ? "tooltip-icon-button icon-active"
          : "tooltip-icon-button"
      }
    >
      <Icon icon={icon} />
    </button>
  );

  renderImageIcon = (type, icon) => (
    <button className="image-upload tooltip-icon-button">
      <label htmlFor="file-input" className=" image-icon">
        <Icon icon={ic_cloud_upload} className="tooltip-icon-button" />
      </label>

      <input
        id="file-input"
        accept="image/*"
        type="file"
        onChange={e => this.onClickImage(e)}
      />
    </button>
  );

  save = e => {
    localStorage.setItem("state", JSON.stringify(this.state.value));
  };

  cancel = e => {
    this.setState({
      value: Value.fromJSON(JSON.parse(localStorage.getItem("state"))),
    });
  };

  getTopLevelBlockCount = () => {
    const { value } = this.state;
    try {
      return value.document.nodes._tail.array.length;
    } catch (err) {
      return 0;
    }
  };

  componentDidUpdate() {
    const { value } = this.state;
    try {
      if (value.document.nodes._tail.array.length === 0) throw "no nodes";
    } catch (err) {
      this.setState({ value: InitialValue });
    }
  }

  render() {
    const { wrapInList, unwrapList } = plugin.changes;
    const inList = plugin.utils.isSelectionInList(this.state.value);
    return (
      <Fragment>
        <Editor
          value={this.state.value}
          schema={schema}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
          renderNode={this.renderNode}
          plugins={plugins}
          shouldNodeComponentUpdate={props =>
            // To update the highlighting of nodes inside the selection
            props.node.type === "list_item"
          }
        />
      </Fragment>
    );
  }
}

function insertImage(editor, src, target) {
  if (target) {
    editor.select(target);
  }

  editor.insertBlock({
    type: "image",
    data: { src },
  });
}
