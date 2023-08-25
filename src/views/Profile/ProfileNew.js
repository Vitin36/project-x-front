import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  Col,
  CardBody,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { GlobalContextConsumer } from "context/global.context";
import { useContext, useEffect, useRef, useState } from "react";
import InfoPopover from "components/InfoPopover/InfoPopover";
import { animateScroll, Element } from "react-scroll";

const Profiles = () => {
  const formRef = useRef(null);
  const { groupPermissions, permissions } = useContext(GlobalContextConsumer);

  const [profile, setProfile] = useState({
    type: null,
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    socialReason: null,
    cnpj: null,
    fantasyName: null,
    segment: null,
    phoneNumber: null,
    cep: null,
    street: null,
    city: null,
    state: null,
    neighborhood: null,
    number: null,
    complement: null,
    name: null,
    office: null,
    cpf: null,
  });

  const [validProfile, setValidProfile] = useState({
    validType: null,
    validUsername: null,
    validEmail: null,
    validPassword: null,
    validConfirmPassword: null,
    validSocialReason: null,
    validCnpj: null,
    validFantasyName: null,
    validSegment: null,
    validPhoneNumber: null,
    validCep: null,
    validStreet: null,
    validCity: null,
    validState: null,
    validNeighborhood: null,
    validNumber: null,
    validComplement: null,
    validName: null,
    validOffice: null,
    validCpf: null,
  });

  const [lastCep, setLastCep] = useState(null);

  const {
    type,
    username,
    email,
    password,
    confirmPassword,
    socialReason,
    cnpj,
    fantasyName,
    segment,
    phoneNumber,
    cep,
    street,
    city,
    state,
    neighborhood,
    number,
    complement,
    name,
    office,
    cpf,
  } = profile;

  const {
    validType,
    validUsername,
    validEmail,
    validPassword,
    validConfirmPassword,
    validSocialReason,
    validCnpj,
    validFantasyName,
    validSegment,
    validPhoneNumber,
    validCep,
    validStreet,
    validCity,
    validState,
    validNeighborhood,
    validNumber,
    validComplement,
    validName,
    validOffice,
    validCpf,
  } = validProfile;

  const submitData = (e) => {
    e.preventDefault();

    setValidProfile({
      ...validProfile,
      validType: validType !== null ? validType : false,
      validUsername: validUsername !== null ? validUsername : false,
      validEmail: validEmail !== null ? validEmail : false,
      validPassword: validPassword !== null ? validPassword : false,
      validConfirmPassword:
        validConfirmPassword !== null ? validConfirmPassword : false,
      validSocialReason: validSocialReason !== null ? validSocialReason : false,
      validCnpj: validCnpj !== null ? validCnpj : false,
      validFantasyName: validFantasyName !== null ? validFantasyName : false,
      validSegment: validSegment !== null ? validSegment : false,
      validPhoneNumber: validPhoneNumber !== null ? validPhoneNumber : false,
      validCep: validCep !== null ? validCep : false,
      validStreet: validStreet !== null ? validStreet : false,
      validCity: validCity !== null ? validCity : false,
      validState: validState !== null ? validState : false,
      validNeighborhood: validNeighborhood !== null ? validNeighborhood : false,
      validNumber: validNumber !== null ? validNumber : false,
      validComplement: validComplement !== null ? validComplement : false,
      validName: validName !== null ? validName : false,
      validOffice: validOffice !== null ? validOffice : false,
      validCpf: validCpf !== null ? validCpf : false,
    });

    // window.location.reload();
    animateScroll.scrollTo("form", {
      smooth: "easeInCubic",
      duration: 500,
      delay: 100,
    });
  };

  useEffect(() => {
    const validType = type !== null ? (type ? true : false) : null;
    const validUsername =
      username !== null ? (username.length >= 5 ? true : false) : null;
    const emailRegex = new RegExp(/\S+@\S+\.\S+/);
    const validEmail = email !== null ? emailRegex.test(email) : null;
    const validPassword =
      password !== null ? (password.length >= 5 ? true : false) : null;
    const validConfirmPassword =
      confirmPassword !== null
        ? confirmPassword === password
          ? true
          : false
        : null;
    const validSocialReason =
      socialReason !== null ? (socialReason.length >= 5 ? true : false) : null;
    const cnpjRegex = new RegExp(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/);
    const validCnpj = cnpj !== null ? cnpjRegex.test(cnpj) : null;
    const validFantasyName =
      fantasyName !== null ? (fantasyName.length >= 5 ? true : false) : null;
    const validSegment =
      segment !== null ? (segment.length >= 5 ? true : false) : null;
    const phoneNumberRegex = new RegExp(/^\(\d{2}\)?\s*\d{4,5}\-?\d{4}$/g);
    const validPhoneNumber =
      phoneNumber !== null ? phoneNumberRegex.test(phoneNumber) : null;
    const cepRegex = new RegExp(/^\d{5}\-?\d{3}$/g);
    const validCep = cep !== null ? cepRegex.test(cep) : null;
    const validNumber = number !== null ? (number ? true : false) : null;
    const validName = name !== null ? (name.length >= 5 ? true : false) : null;
    const cpfRegex = new RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/);
    const validCpf = cpf !== null ? cpfRegex.test(cpf) : null;
    const validOffice =
      office !== null ? (office.length >= 5 ? true : false) : null;

    if (validCep) {
      updateAddress();
    }

    setValidProfile({
      ...validProfile,
      validType,
      validUsername,
      validEmail,
      validPassword,
      validConfirmPassword,
      validSocialReason,
      validCnpj,
      validFantasyName,
      validSegment,
      validPhoneNumber,
      validCep,
      validNumber,
      validName,
      validCpf,
      validOffice,
    });
  }, [profile]);

  const updateAddress = async () => {
    if (cep !== lastCep) {
      const response = await fetch(
        `https://viacep.com.br/ws/${cep.replace("-", "")}/json/`
      );
      const { bairro, localidade, logradouro, uf, erro } =
        await response.json();

      if (erro) {
        setProfile({
          ...profile,
          neighborhood: "",
          street: "",
          city: "",
          state: "",
          cep: "",
        });
        setLastCep(cep);
        return;
      }

      setProfile({
        ...profile,
        neighborhood: bairro,
        street: logradouro,
        city: localidade,
        state: uf,
      });
      setLastCep(cep);
    }
  };

  const renderCommons = () => {
    return (
      <>
        <Row>
          <Col xl="6">
            <label className="form-control-label" htmlFor="input-username">
              Nome de Usuário
            </label>
            <FormGroup
              className={`${
                validUsername !== null
                  ? !validUsername
                    ? "has-danger"
                    : "has-success"
                  : ""
              }`}
            >
              <Input
                className={`form-control-alternative ${
                  validUsername !== null
                    ? !validUsername
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="username"
                placeholder="nome.sobrenome"
                type="text"
                value={username}
                onChange={(e) => {
                  setProfile({ ...profile, username: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
          <Col xl="6">
            <label className="form-control-label" htmlFor="input-username">
              Email
            </label>
            <FormGroup
              className={`${
                validEmail !== null
                  ? !validEmail
                    ? "has-danger"
                    : "has-success"
                  : ""
              }`}
            >
              <Input
                className={`form-control-alternative ${
                  validEmail !== null
                    ? !validEmail
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="email"
                placeholder="email@cliente.com.br"
                type="email"
                value={email}
                onChange={(e) => {
                  setProfile({ ...profile, email: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
          <Col xl="6">
            <label className="form-control-label" htmlFor="input-username">
              Senha
            </label>
            <FormGroup
              className={`${
                validPassword !== null
                  ? !validPassword
                    ? "has-danger"
                    : "has-success"
                  : ""
              }`}
            >
              <Input
                className={`form-control-alternative ${
                  validPassword !== null
                    ? !validPassword
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="password"
                placeholder="******"
                type="password"
                value={password}
                autoComplete="on"
                onChange={(e) => {
                  setProfile({ ...profile, password: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
          <Col xl="6">
            <label className="form-control-label" htmlFor="input-username">
              Confirmação da Senha
            </label>
            <FormGroup
              className={`${
                validConfirmPassword !== null
                  ? !validConfirmPassword
                    ? "has-danger"
                    : "has-success"
                  : ""
              }`}
            >
              <Input
                className={`form-control-alternative ${
                  validConfirmPassword !== null
                    ? !validConfirmPassword
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="confirmPassword"
                placeholder="******"
                type="password"
                autoComplete="on"
                value={confirmPassword}
                onChange={(e) => {
                  setProfile({ ...profile, confirmPassword: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
        </Row>
      </>
    );
  };

  const renderContact = () => {
    return (
      <>
        <Row>
          <Col xl="6">
            <label className="form-control-label" htmlFor="input-username">
              Telefone de Contato
            </label>
            <FormGroup
              className={`${
                validPhoneNumber !== null
                  ? !validPhoneNumber
                    ? "has-danger"
                    : "has-success"
                  : ""
              }`}
            >
              <Input
                className={`form-control-alternative ${
                  validPhoneNumber !== null
                    ? !validPhoneNumber
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="phoneNumber"
                placeholder="(99) 99999-9999"
                type="text"
                value={phoneNumber}
                onChange={(e) => {
                  setProfile({ ...profile, phoneNumber: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
          <Col xl="6">
            <label className="form-control-label" htmlFor="input-username">
              Cep
            </label>
            <FormGroup
              className={`${
                validCep !== null
                  ? !validCep
                    ? "has-danger"
                    : "has-success"
                  : ""
              }`}
            >
              <Input
                className={`form-control-alternative ${
                  validCep !== null
                    ? !validCep
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="cep"
                placeholder="00000-000"
                type="text"
                value={cep}
                onChange={(e) => {
                  setProfile({ ...profile, cep: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xl="4">
            <label className="form-control-label" htmlFor="input-username">
              Numero
            </label>
            <FormGroup
              className={`${
                validNumber !== null
                  ? !validNumber
                    ? "has-danger"
                    : "has-success"
                  : ""
              }`}
            >
              <Input
                className={`form-control-alternative ${
                  validNumber !== null
                    ? !validNumber
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="number"
                placeholder=""
                type="text"
                value={number}
                onChange={(e) => {
                  setProfile({ ...profile, number: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
          <Col xl="4">
            <label className="form-control-label" htmlFor="input-username">
              Complemento
            </label>
            <FormGroup>
              <Input
                className="form-control-alternative"
                id="complement"
                placeholder=""
                type="text"
                value={complement}
                onChange={(e) => {
                  setProfile({ ...profile, complement: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
          <Col xl="4">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-username">
                Rua
              </label>
              <Input
                disabled
                className="form-control-alternative"
                id="street"
                placeholder="-"
                type="text"
                value={street}
              />
            </FormGroup>
          </Col>
          <Col xl="4">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-username">
                Bairro
              </label>
              <Input
                disabled
                className="form-control-alternative"
                id="neighborhood"
                placeholder="-"
                type="text"
                value={neighborhood}
              />
            </FormGroup>
          </Col>
          <Col xl="4">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-username">
                Cidade
              </label>
              <Input
                disabled
                className="form-control-alternative"
                id="city"
                placeholder="-"
                type="text"
                value={city}
              />
            </FormGroup>
          </Col>
          <Col xl="4">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-username">
                Estado
              </label>
              <Input
                disabled
                className="form-control-alternative"
                id="state"
                placeholder="-"
                type="text"
                value={state}
              />
            </FormGroup>
          </Col>
        </Row>
      </>
    );
  };

  const renderCliente = () => {
    return (
      <>
        {renderCommons()}
        <Row>
          <Col xl="6">
            <label className="form-control-label" htmlFor="input-username">
              Razao Social
            </label>
            <FormGroup
              className={`${
                validSocialReason !== null
                  ? !validSocialReason
                    ? "has-danger"
                    : "has-success"
                  : ""
              }`}
            >
              <Input
                className={`form-control-alternative ${
                  validSocialReason !== null
                    ? !validSocialReason
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="razaoSocial"
                placeholder="Empresa LTDA"
                type="text"
                value={socialReason}
                onChange={(e) => {
                  setProfile({ ...profile, socialReason: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
          <Col xl="6">
            <label className="form-control-label" htmlFor="input-username">
              Cpnj
            </label>
            <FormGroup
              className={`${
                validCnpj !== null
                  ? !validCnpj
                    ? "has-danger"
                    : "has-success"
                  : ""
              }`}
            >
              <Input
                className={`form-control-alternative ${
                  validCnpj !== null
                    ? !validCnpj
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="cnpj"
                placeholder="00.000.0000/0000-00"
                type="text"
                value={cnpj}
                onChange={(e) => {
                  setProfile({ ...profile, cnpj: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
          <Col xl="6">
            <label className="form-control-label" htmlFor="input-username">
              Nome Fantasia
            </label>
            <FormGroup
              className={`${
                validFantasyName !== null
                  ? !validFantasyName
                    ? "has-danger"
                    : "has-success"
                  : ""
              }`}
            >
              <Input
                className={`form-control-alternative ${
                  validFantasyName !== null
                    ? !validFantasyName
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="fantasyName"
                placeholder="Nome Fantasia"
                type="text"
                value={fantasyName}
                onChange={(e) => {
                  setProfile({ ...profile, fantasyName: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
          <Col xl="6">
            <label className="form-control-label" htmlFor="input-username">
              Segmento
            </label>
            <FormGroup
              className={`${
                validSegment !== null
                  ? !validSegment
                    ? "has-danger"
                    : "has-success"
                  : ""
              }`}
            >
              <Input
                className={`form-control-alternative ${
                  validSegment !== null
                    ? !validSegment
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="segment"
                placeholder="Alimentação"
                type="text"
                value={segment}
                onChange={(e) => {
                  setProfile({ ...profile, segment: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
        </Row>
        {renderContact()}
      </>
    );
  };

  const renderOperador = () => {
    return (
      <>
        {renderCommons()}
        <Row>
          <Col xl="12">
            <label className="form-control-label" htmlFor="input-username">
              Nome Completo
            </label>
            <FormGroup
              className={`${
                validName !== null
                  ? !validName
                    ? "has-danger"
                    : "has-success"
                  : ""
              }`}
            >
              <Input
                className={`form-control-alternative ${
                  validName !== null
                    ? !validName
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="nomeCompleto"
                placeholder="Nome Sobrenome"
                type="text"
                value={name}
                onChange={(e) => {
                  setProfile({ ...profile, name: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
          <Col xl="6">
            <label className="form-control-label" htmlFor="input-username">
              Cpf
            </label>
            <FormGroup
              className={`${
                validCpf !== null
                  ? !validCpf
                    ? "has-danger"
                    : "has-success"
                  : ""
              }`}
            >
              <Input
                className={`form-control-alternative ${
                  validCpf !== null
                    ? !validCpf
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="cpf"
                placeholder="000.000.000-00"
                type="text"
                value={cpf}
                onChange={(e) => {
                  setProfile({ ...profile, cpf: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
          <Col xl="6">
            <label className="form-control-label" htmlFor="input-username">
              Cargo
            </label>
            <FormGroup
              className={`${
                validOffice !== null
                  ? !validOffice
                    ? "has-danger"
                    : "has-success"
                  : ""
              }`}
            >
              <Input
                className={`form-control-alternative ${
                  validOffice !== null
                    ? !validOffice
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="cargo"
                placeholder="Nome Fantasia"
                type="text"
                value={office}
                onChange={(e) => {
                  setProfile({ ...profile, office: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
        </Row>
        {renderContact()}
      </>
    );
  };

  const renderGroupPermissions = () => {
    return (
      <>
        <hr className="my-4" />
        <h6 className="heading-small text-muted mb-4">Grupo de Permissões</h6>
        <Row>
          {groupPermissions.map((groupPermission) => {
            const { id, name, description } = groupPermission;
            return (
              <Col xl="4" xs="12" key={id}>
                <Row>
                  <Col xs="9">
                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        className="custom-control-input"
                        id={`groupPermission-${id}`}
                        type="checkbox"
                        value=""
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={`groupPermission-${id}`}
                      >
                        {name}
                      </label>
                    </div>
                  </Col>
                  <Col xs="3">
                    <InfoPopover
                      id={`group-popover-${id}`}
                      description={description}
                    />
                  </Col>
                </Row>
              </Col>
            );
          })}
        </Row>
      </>
    );
  };

  const renderIndividualsPermissions = () => {
    return (
      <>
        <hr className="my-4" />
        <h6 className="heading-small text-muted mb-4">
          Permissões Individuais
        </h6>
        <Row>
          {permissions.map((permission) => {
            const { id, name, description } = permission;
            return (
              <Col xl="4" xs="12" key={id}>
                <Row>
                  <Col xs="9">
                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        className="custom-control-input"
                        id={`permission-${id}`}
                        type="checkbox"
                        value=""
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={`permission-${id}`}
                      >
                        {name}
                      </label>
                    </div>
                  </Col>
                  <Col xs="3">
                    <InfoPopover
                      id={`permission-popover-${id}`}
                      description={description}
                    />
                  </Col>
                </Row>
              </Col>
            );
          })}
        </Row>
      </>
    );
  };

  const renderCriar = () => {
    return (
      <>
        <hr className="my-4" />
        <Row>
          <Col className="justify-content-end align-items-end">
            <Button>Criar</Button>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      <Header dash={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <Col>
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Novo Usuário</h3>
              </CardHeader>
              <CardBody>
                <Element name="form" className="form" id="form" classID="form">
                  <Form onSubmit={submitData} ref={formRef}>
                    <h6 className="heading-small text-muted mb-4">
                      Informações do Usuário
                    </h6>
                    <Row>
                      <Col xl="12">
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="tipoUsuario1"
                            name="tipo-usuario"
                            type="radio"
                            value={"cliente"}
                            onChange={() => {
                              setProfile({ ...profile, type: "cliente" });
                            }}
                            checked={type === "cliente"}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="tipoUsuario1"
                          >
                            Cliente
                          </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="tipoUsuario2"
                            name="tipo-usuario"
                            type="radio"
                            value={"operador"}
                            onChange={() => {
                              setProfile({ ...profile, type: "operador" });
                            }}
                            checked={type === "operador"}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="tipoUsuario2"
                          >
                            Operador
                          </label>
                        </div>
                      </Col>
                    </Row>
                    {type === "cliente" ? renderCliente() : null}
                    {type === "operador" ? renderOperador() : null}
                    {type === "cliente" || type === "operador"
                      ? renderGroupPermissions()
                      : null}
                    {type === "cliente" || type === "operador"
                      ? renderIndividualsPermissions()
                      : null}
                    {type === "cliente" || type === "operador"
                      ? renderCriar()
                      : null}
                  </Form>
                </Element>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profiles;
