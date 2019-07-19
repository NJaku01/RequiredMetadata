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

    const self = props;

    return (

        <Card id="authorcard">


            <CardContent>
                <div class="form">
                    <Formik
                        onSubmit={(values, actions) => {
                            props.handleUpdate(props.id, values);
                            handleExpandClick();
                        }}
                        render={props => <AuthorForm{...props} method={"Update"} onChange={self.handleUpdate}
                                                    id={self.id}/>}
                        initialValues={props.author}
                        validationSchema={authorValidationSchema}
                    />

                </div>
                <div>


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
                </div>
            </CardContent>


            <br/>
        </Card>

    );

}

export default AuthorCard;