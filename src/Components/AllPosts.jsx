import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class AllPosts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editing: {}
        }
    }

    static defaultProps = {
        posts: [],
        onDelete: () => null,
        onEdit: () => null,
    }

    handleDelete = (post) => {
        if (window.confirm('Are you sure')) {
            this.props.onDelete(post);
        }
    }

    handleEdit = (post) => {
        const { editing } = this.state;

        this.setState({ editing: { ...editing, [post.id]: { ...post } } });
    }

    handleEditCancel = (id) => {
        const { editing } = this.state;
        const { [id]: curr, ...others } = editing;

        this.setState({ editing: { ...others } });
    }

    handleFieldEdit = (id, field, event) => {
        const { target: { value } } = event;
        const { editing } = this.state;
        const editData = { ...editing[id] };

        editData[field] = value;

        this.setState({
            editing: { ...editing, ...{ [id]: editData } }
        });
    }

    handleEditSave = (id) => {
        const { editing } = this.state;
        const { [id]: editedPost, ...others } = editing;

        this.props.onEdit({ ...editedPost });
        this.setState({
            editing: { ...others }
        });
    }

    renderOrEditPost = (post) => {
        const { editing } = this.state;

        const editData = editing[post.id];
        const isEditing = !!editData;

        return (
            !isEditing ?
                (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.author}</td>
                        <td>
                            <div>
                                <Button color='primary' size="sm" onClick={this.handleEdit.bind(this, post)}>Edit</Button>{' '}
                                <Button color='danger' size="sm" onClick={this.handleDelete.bind(this, post)}>Delete</Button>
                            </div>
                        </td>
                    </tr>
                ) : (
                    <tr key={post.id}>
                        <td>
                            {post.id}
                        </td>
                        <td>
                            <input type='text' value={editData.title} onChange={this.handleFieldEdit.bind(this, post.id, 'title')} />
                        </td>
                        <td>
                            <input type='text' value={editData.author} onChange={this.handleFieldEdit.bind(this, post.id, 'author')} />
                        </td>
                        <td>
                            <Button color="success" size="sm" onClick={this.handleEditSave.bind(this, post.id)}>Save</Button>{' '}
                            <Button color='primary' size="sm" onClick={this.handleEditCancel.bind(this, post.id)}>Cancel</Button>
                        </td>
                    </tr>
                )
        );
    }

    render() {
        const { posts } = this.props;

        return (
            <table width='100%' className='table'>
                <thead>
                    <tr>
                        <th scope='col' width='10%'>id</th>
                        <th scope='col' width='50%'>title</th>
                        <th scope='col' width='20%'>author</th>
                        <th scope='col' width='20%'>action</th>
                    </tr>
                </thead>
                <tbody>
                    {[].concat(posts).sort((a, b) => b.id - a.id).map(this.renderOrEditPost)}
                </tbody>
            </table>
        );
    }
}