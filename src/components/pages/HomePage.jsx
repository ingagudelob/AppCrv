import { Form, Row } from "react-bootstrap"

const HomePage = () => {
    return (
        <div>
            <Form as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Group>
                    <Form.Label>
                        Home
                    </Form.Label>
                </Form.Group>
            </Form>
        </div>
    )
}

export default HomePage
