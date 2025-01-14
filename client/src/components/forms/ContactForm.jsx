import {useForm, ValidationError} from '@formspree/react'

export default function ContactForm() {
    const [state, handleSubmit] = useForm('mvgojqnw')
    if (state.succeeded) {
        return <p>Thanks for the message! I'll reply ASAP!</p>
    }
    return (
        <>
            <h2 className={'form-heading'}>Say Hello</h2>
            <form className={'contact-form'} onSubmit={handleSubmit}>
                <fieldset className={'name'}>
                    <label htmlFor={'name'}>
                        Your Name
                    </label>
                    <input
                        id={'name'}
                        type={'name'}
                        name={'name'}
                    />
                    <ValidationError
                        prefix={'name'}
                        field={'name'}
                        errors={state.errors}
                    />
                </fieldset>
                <fieldset className={'email'}>
                    <label htmlFor={'email'}>
                        Email Address
                    </label>
                    <input
                        id={'email'}
                        type={'email'}
                        name={'email'}
                    />
                    <ValidationError
                        prefix={'Email'}
                        field={'email'}
                        errors={state.errors}
                    />
                </fieldset>
                <fieldset className={'message'}>
                    <label htmlFor={'message'}>
                        Message
                    </label>
                    <textarea
                        id={'message'}
                        name={'message'}
                    />
                    <ValidationError
                        prefix={'message'}
                        field={'message'}
                        errors={state.errors}
                    />
                </fieldset>
                <button type={'submit'} disabled={state.submitting}>
                    Submit
                </button>
            </form>
        </>
    )
}
