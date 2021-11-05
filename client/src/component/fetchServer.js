import axios from "axios";

export default function FetchServer(value, postBody) {
    return (
        axios.post(`/${value}`, postBody)
            .then(res => {
                const result = res.data;
                return { result }
            })
    )
}

