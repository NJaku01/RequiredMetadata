import React, {Component} from "react";
import AuthorCard from "./AuthorCard"
import {Card, IconButton, CardContent} from "@material-ui/core";


class Authors extends Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            deletable: false
        };
        this.handleExpandClick = this.handleExpandClick.bind(this);
    }

    handleExpandClick() {
        this.setState({expanded: !this.state.expanded});
    }

    componentDidMount() {
        if (this.props.authors.length > 1) {
            this.setState({deletable: true})
        } else {
            this.setState({deletable: false})
        }
    }


    handleDelete(i) {
        let authors = this.props.authors.slice();

        authors.splice(i, 1);

        this.props.onUpdate(authors);
        if (authors.length > 1) {
            this.setState({deletable: true});
        } else {
            this.setState({deletable: false});
        }
    }

    handleUpdate = (i, value) => {
        const authors = this.props.authors.slice();
        authors[i] = value;
        this.props.onUpdate(authors);
    };

    render() {
        return (
            <Card>
                <CardContent>
                    <h4>Authors</h4>
                    {this.props.authors.map((item, index) =>
                        <AuthorCard
                            key={index}
                            id={index}
                            author={item}
                            deletable={this.state.deletable}
                            handleDelete={() => this.handleDelete(index)}
                            handleUpdate={this.handleUpdate}
                        />
                    )}
                    <br/>
                </CardContent>

                <IconButton aria-label="Add"
                            onClick={() => this.props.onUpdate(this.props.authors.concat({
                                author: "",
                                affiliation: "",
                                orcid: ""
                            }))}
                            color="primary"
                >
                    <i className="material-icons">
                        add
                    </i>
                </IconButton>

            </Card>

        )
    }
}

export default Authors