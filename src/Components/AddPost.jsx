import React, { Component } from 'react';
import {
    Container,
    Col,
    Button,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';

export default class AddPost extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    static defaultProps = {
        onAdd: () => null
    }

    getInitialState = () => ({
        id: '',
        title: '',
        author: '',
    });

    handleChange = (field, event) => {
        const { target: { value } } = event;

        this.setState({
            [field]: value
        });
    }

    handleAdd = () => {
        const { id, title, author } = this.state;

        this.setState(this.getInitialState(), () => {
            this.props.onAdd({ id, title, author });
        });
    }

    handleCancel = () => {
        this.setState(this.getInitialState());
    }

    render() {
        return (
            <Container>
                <Col xs='auto'>
                    <Form>
                        <FormGroup>
                            <legend>Add new Post</legend>

                            <InputGroup>
                                <InputGroupAddon addonType='prepend'>ID</InputGroupAddon>
                                <Input type='text' placeholder='ID' value={this.state.id} onChange={this.handleChange.bind(this, 'id')} />
                            </InputGroup>
                            <br />
                            <InputGroup>
                                <InputGroupAddon addonType='prepend'>Title</InputGroupAddon>
                                <Input type='text' placeholder='Title' value={this.state.title} onChange={this.handleChange.bind(this, 'title')} />
                            </InputGroup>
                            <br />
                            <InputGroup>
                                <InputGroupAddon addonType='prepend'>Author</InputGroupAddon>
                                <Input type='text' placeholder='Author' value={this.state.author} onChange={this.handleChange.bind(this, 'author')} />
                            </InputGroup>

                            <br />
                            <div>
                                <Button color='success' onClick={this.handleAdd}>Add new post</Button>{' '}
                                <Button color='primary' onClick={this.handleCancel}>Cancel</Button>
                            </div>
                        </FormGroup>
                    </Form>
                </Col>
            </Container>
        );
    }
}