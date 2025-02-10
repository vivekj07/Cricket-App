import React from 'react'
import { Helmet } from "react-helmet-async"

const Title = ({
    title = "GPL",
    description = "Enjoy Cricket From Anywhere"
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" description={description}></meta>
        </Helmet>
    )
}

export default Title