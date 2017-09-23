import React from 'react';
import $ from 'jquery';
import {
    ButtonGroup, ButtonDropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Navbar, NavItem,
    Modal, NavLink, ModalHeader, ModalBody, Container,
    Row, Col, InputGroup, InputGroupAddon, Input, Button
} from 'reactstrap';
import { logOut } from '../ConfigFirebase/Authentication';
import ActionTool from '../Component/ActionTool';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/sidenav.css';
import '../css/mouse.css';


/// form tool nav bar
var controlNav = 0;

function clickNav() {
    controlNav += 1;

    if (controlNav == 1) {
        document.getElementById("mySidenav").style.width = "200px";
        $("main").css({ marginLeft: 200 })
        document.getElementById("main").style.marginLeft = "200px";
        $('#converse-fa-caret').removeClass('fa-caret-right');
        $('#converse-fa-caret').addClass('fa-caret-left');

    } else {
        document.getElementById("mySidenav").style.width = "0";
        $("main").css({ marginLeft: 0 })
        document.getElementById("main").style.marginLeft = "0";
        $('#converse-fa-caret').removeClass('fa-caret-left');
        $('#converse-fa-caret').addClass('fa-caret-right');

    }

    if (controlNav == 2) {
        controlNav -= 2;
    }

}


// กำหนด canvas และ สร้าง
export var CanvasID = 'canvas';;


function clickCreateCanvas() {

    $("#canvas").remove();
    var wArea = $('#widthArea').val();
    var hArea = $('#heightArea').val();

    var canvasID = CanvasID;
    $('<canvas>').attr({
        id: canvasID,
        value: 1,
        width: wArea + 'px',
        height: hArea + 'px',
    }).appendTo('#canvasContainer');

    var canvas = document.getElementById(canvasID);
    var ctx = canvas.getContext('2d');

    $('#canvas').addClass('jumbotrons');


  


}


export default class Main extends React.Component {

componentDidMount (){
    $("#industrialButton").attr("disabled", false);
}

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleCreateCanvas = this.toggleCreateCanvas.bind(this);

        this.state = {
            dropdownOpen: false,
            modalCreateCanvas: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    toggleCreateCanvas() {
        this.setState({
            modalCreateCanvas: !this.state.modalCreateCanvas
        });
    }






    render() {
        return (
            <div>
                <Navbar color="faded" light>
                    <ButtonGroup>
                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>File</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.toggleCreateCanvas}>New</DropdownItem>
                                <DropdownItem onClick={() => logOut()}>Log Out</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </ButtonGroup>
                </Navbar>
                <div>
                    <div id="mySidenav" className="sidenav">
                        <center>
                            <h4>Tools</h4>
                            <Button onClick={ActionTool.bind(this)} color="primary" size="lg" id="industrialButton" data-size="3" data-tool="industrial" data-colour="yellow" className="toolButton unselected">บล็อคตลาด</Button>
                            <Button onClick={ActionTool.bind(this)} color="primary" size="lg" id="industrialButton" data-size="3" data-tool="industrial" data-colour="yellow" className="toolButton unselected">ลบบล็อคตลาด</Button>
                        </center>
                    </div>

                    <Modal isOpen={this.state.modalCreateCanvas} toggler={this.toggleCreateCanvas} className={this.props.className}>
                        <ModalHeader toggle={this.toggleCreateCanvas}>New Canvas</ModalHeader>
                        <ModalBody>
                            <Container>
                                <Row>
                                    <Col sm="12" md={{ size: 10, offset: 1 }}>
                                        <InputGroup>
                                            <br />
                                            <InputGroupAddon>ชื่อตลาด</InputGroupAddon>
                                            <Input type="text" id="nameTalad" />
                                        </InputGroup>
                                        <br />
                                        <InputGroup>
                                            <InputGroupAddon>ขนาด</InputGroupAddon>
                                            <InputGroupAddon>กว้าง</InputGroupAddon>
                                            <Input type="number" id="widthArea" />
                                            <InputGroupAddon>สูง</InputGroupAddon>
                                            <Input type="number" id="heightArea" />
                                        </InputGroup>
                                        <br />
                                        <center>
                                            <div onClick={() => clickCreateCanvas()}>
                                                <Button onClick={this.toggleCreateCanvas} color="primary" size="lg">ตกลง </Button>{this.toggleCreateCanvas}
                                            </div>
                                        </center>
                                    </Col>
                                </Row>
                            </Container>
                        </ModalBody>
                    </Modal>


                    <div id="main" >
                        <div className="open-sidenav " onClick={() => clickNav()} >
                            <i id="converse-fa-caret" className="fa fa-caret-right faCenter open-sidenav" style={{ fontSize: 40, color: 'rgb(123, 123, 123)' }}></i>
                        </div>
                        <main id="canvasContainer">
                        </main>
                    </div>
                </div>


            </div>
        )
    }
}

