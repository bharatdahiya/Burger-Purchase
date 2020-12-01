import React from 'react';
import Button from '../../components/UI/Button/Button';
import './UserData.css';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/spinner';
import Input from '../../components/UI/Forms/Input/Input';
export default class UserData extends React.Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            pincode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Pincode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            emailId: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'express', displayName: 'Express' },
                        { value: 'standard', displayName: 'Standard' }
                    ]
                },
                validation: {},
                value: 'express',
                valid: true
            }
        },
        isFormValid: false,
        loading: false
    }

    onOrderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementID in this.state.orderForm) {
            formData[formElementID] = this.state.orderForm[formElementID].value
        }
        //Https request.
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            order: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error)
            });
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length >= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChnagedHandler = (event, inputIndentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIndentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIndentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIndentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIndentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, isFormValid: formIsValid });
    }

    render() {

        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.onOrderHandler}>
                {
                    formElements.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChnagedHandler(event, formElement.id)} />
                    ))
                }
                <Button btnType="Success" disabled={!this.state.isFormValid} >ORDER</Button>
            </form>);

        if (this.state.loading) {
            form = <Spinner />
        }

        return (

            <div className="userData">
                <h4>Enter your contact details</h4>
                {form}
            </div>);

    }
}