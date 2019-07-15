import React, {Component} from "react";
import AuthorCard from "./AuthorCard"
import { Collapse, Card, IconButton, CardActions} from "@material-ui/core";
import {Formik} from "formik";
import {AuthorForm, authorValidationSchema} from "./AuthorForm";


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

        this.props.onUpdate(authors)
        if (authors.length > 1) {
            this.setState({deletable: true});
        } else {
            this.setState({deletable: false});
        }
    }

    handleUpdate = (i, value) => {
        const authors = this.props.authors.slice();
        authors[i] = value;
        this.props.onUpdate(authors)
    };

    render() {
        return (
            <Card>
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

                <IconButton aria-Label="Edit"
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            color="primary"
                >
                    <i className="material-icons">
                        add
                    </i>
                </IconButton>

                <Collapse in={this.state.expanded}>
                    < Formik
                        onSubmit={(values, actions) => {
                            this.setState({expanded: !this.state.expanded});
                            this.props.onUpdate(this.props.authors.concat(values));
                            this.setState({deletable: true});
                            }
                        }
                        render={props => <AuthorForm{...props} method={"Add"}/>
                        }
                        validationSchema={authorValidationSchema}
                    />
                </Collapse>
            </Card>
        )
    }
}

export default Authors