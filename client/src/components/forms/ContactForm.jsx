import {useForm, ValidationError} from '@formspree/react'

export default function ContactForm() {
    const [state, handleSubmit] = useForm('mvgojqnw')
    if (state.succeeded) {
        return <p>Thanks for the message! I&#39;ll reply ASAP!</p>
    }
    return (
        <>
            <h2 className={'form-heading'}>Say Hello</h2>
            <form className={'contact-form'} onSubmit={handleSubmit}>
                <span className={'name input-container'}>
                    <label htmlFor={'name'}>Your Name</label>
                    <input id={'name'} type={'name'} name={'name'} />
                    <ValidationError prefix={'name'} field={'name'} errors={state.errors} />
                </span>
                <span className={'email input-container'}>
                    <label htmlFor={'email'}>Email Address</label>
                    <input id={'email'} type={'email'} name={'email'} />
                    <ValidationError prefix={'Email'} field={'email'} errors={state.errors} />
                </span>
                <span className={'message input-container'}>
                    <label htmlFor={'message'}>Message</label>
                    <textarea id={'message'} name={'message'} />
                    <ValidationError prefix={'message'} field={'message'} errors={state.errors} />
                </span>
                <button type={'submit'} disabled={state.submitting}>
                    Submit
                </button>
            </form>
        </>
    )
}
