import * as Yup from "yup";
import {TextField} from "@material-ui/core";
import React from "react";

export const authorValidationSchema = Yup.object({

    author: Yup.string()
        .required('Author is required'),

});

export const AuthorForm = props => {

    const {
        values: {author, affiliation, orcid},
        errors,
        touched,
        handleChange,
        setFieldTouched,
    } = props;

    const change = (name, e) => {
        e.persist();
        e.target.name = name;
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    function update() {
        props.onChange(props.id, props.values);
    }


    return (
        <form>

            <TextField
                id="author"
                label="Author"
                type="text"
                style={{margin: 8}}
                required
                helperText={touched.author ? errors.author : ""}
                error={touched.author && Boolean(errors.author)}
                value={author}
                onChange={change.bind(null, "author")}
                onBlur={update}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}/>
            <TextField
                id="affiliation"
                label="Affiliation"
                type="text"
                style={{margin: 8}}
                helperText={touched.affiliation ? errors.affiliation : ""}
                error={touched.affiliation && Boolean(errors.affiliation)}
                value={affiliation}
                onBlur={update}
                onChange={change.bind(null, "affiliation")}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}/>
            <TextField
                id="orcId"
                label="ORCID"
                type="text"
                style={{margin: 8}}
                helperText={touched.orcid ? errors.orcid : ""}
                error={touched.orcid && Boolean(errors.orcid)}
                value={orcid}
                onBlur={update}
                onChange={change.bind(null, "orcid")}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}/>

        </form>)
};