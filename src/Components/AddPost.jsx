import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    Label,
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
                    <Form>
                        <FormGroup>
                            <Row>
                                <Col sm={{ size: 'auto', offset: 4 }}>
                                    <legend>Add new Post</legend>
                                    <InputGroup>
                                        <Label for='id'>
                                            <InputGroupAddon addonType='prepend'>ID</InputGroupAddon>
                                        </Label>
                                        <Input type='text' id='id' placeholder='ID' value={this.state.id} onChange={this.handleChange.bind(this, 'id')} />
                                    </InputGroup>

                                    <InputGroup>
                                        <Label for='title'>
                                            <InputGroupAddon addonType='prepend'>Title</InputGroupAddon>
                                        </Label>
                                        <Input type='text' id='title' placeholder='Title' value={this.state.title} onChange={this.handleChange.bind(this, 'title')} />
                                    </InputGroup>

                                    <InputGroup>
                                        <Label for='author'>
                                            <InputGroupAddon addonType='prepend'>Author</InputGroupAddon>
                                        </Label>
                                        <Input type='text' id='author' placeholder='Author' value={this.state.author} onChange={this.handleChange.bind(this, 'author')} />
                                    </InputGroup>

                                    <Button color='success' onClick={this.handleAdd}>Add new post</Button>{' '}
                                    <Button color='primary' onClick={this.handleCancel}>Cancel</Button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
            </Container>
        );
    }
}