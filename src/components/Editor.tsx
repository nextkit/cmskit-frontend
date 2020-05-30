import { Editor as EditorJs, EditorState, RichUtils } from 'draft-js';
import React from 'react';

interface IProps {}
interface IState {
  editorState: EditorState;
}

class Editor extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { editorState: EditorState.createEmpty() };
  }

  onChange = (editorState: EditorState) => this.setState({ editorState });
  onBoldClick = () => this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));

  render() {
    return (
      <>
        <button onClick={this.onBoldClick}>Bold</button>
        <EditorJs editorState={this.state.editorState} onChange={this.onChange} />
      </>
    );
  }
}

export default Editor;
