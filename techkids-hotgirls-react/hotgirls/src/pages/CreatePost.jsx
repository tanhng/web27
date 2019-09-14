import React, { Component } from 'react';

class CreatePost extends Component {

    state = {
        imageFile:undefined,
        content: '',
        imageUrl: '',
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const formData=new FormData();
        formData.append('image',this.state.imageFile);
        fetch(`http://localhost:3001/uploads/photos`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept' : 'application/json',
            },
            body: formData,
        })
        .then((res)=>{
            return res.json();
        })
        .then ((data)=>{
            this.setState({
                imageUrl: data.data.imageUrl,
            })
            console.log('data upload ne',data.data.imageUrl);
            console.log('state upload',this.state);
        })









        // fetch('http://localhost:3001/posts/create', {
        //     method: 'POST', //PUT
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     credentials: 'include',
        //     body: JSON.stringify({
        //         content: this.state.content,
        //         imageUrl: this.state.imageUrl,
        //     }),
        // })
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((data) => {
        //         console.log('data create ne', data);
        //         // window.location.href='/';
        //     })



    }


    handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        if (imageFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onloadend = (data) => {
                console.log(data);
                this.setState({
                    imageFile: imageFile,
                    imageUrl: data.currentTarget.result,
                })
                console.log(this.state);
            };
        }
    }

    render() {
        return (
            <div className='row mt-5'>
                <div className='col-2'></div>
                <div className='col-8'>




                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">

                            <input type='file'
                            required={true}
                            accept='image/*'
                                className='form-control'
                                onChange={this.handleImageChange}
                                style={{
                                    color: 'transparent',
                                    margin: '0 auto',
                                    textIndent: '-999en',
                                    zIndex: '10',
                                    height: '50px',
                                }}
                            >

                            </input>
                            {this.state.imageFile ? <div >
                                <img style={{ height: '450px', width: 'auto', textAlign: 'center' }} src={this.state.imageUrl} />
                            </div> : null}
                            <div className=" form-group mt-5">
                                <textarea
                                required={true}
                                    value={this.state.content}
                                    onChange={(event) => {
                                        this.setState({
                                            content: event.target.value,
                                        })
                                    }}
                                    className="form-control" id="exampleFormControlTextarea1" placeholder='Content' rows="4"></textarea>
                            </div>








                            <button type="submit" className="btn btn-warning">Create</button>
                        </div>

                    </form>
                </div>
                <div className='col-2'></div>
            </div>
        );
    }
}

export default CreatePost;