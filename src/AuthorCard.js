import {Card, CardActions, CardContent, Collapse, IconButton} from "@material-ui/core";
import {create} from "material-design-icons";
import {Formik} from "formik";
import React from "react";
import {AuthorForm, authorValidationSchema} from "./AuthorForm";
import "./authorCard.css";


function AuthorCard(props) {

    const [expanded, setExpanded] = React.useState(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    return (

        <Card id="authorcard">

            <CardContent>
                <p>{props.author.author}</p>
                <p>{props.author.affiliation}</p>
                <p>{props.author.orcid}</p>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-Label="Edit"
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            color="primary"
                >
                    <i className="material-icons">
                        create
                    </i>
                </IconButton>
                {props.deletable ?
                    <IconButton aria-Label="Delete"
                                onClick={() => props.handleDelete()}
                                color="primary"
                    >
                        <i className="material-icons">
                            delete
                        </i>
                    </IconButton>
                    : ''}
            </CardActions>
            <Collapse in={expanded}>
                <CardContent>
                    <Formik
                        onSubmit={(values, actions) => {
                            props.handleUpdate(props.id, values);
                            handleExpandClick();
                        }}
                        render={props => <AuthorForm{...props} method={"Update"}/>}
                        initialValues={props.author}
                        validationSchema={authorValidationSchema}
                    />
                </CardContent>
            </Collapse>
        </Card>
    );

}

export default AuthorCard;