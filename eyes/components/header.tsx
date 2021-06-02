import Head from "next/head";
import { Container, Input, Image, Menu, Dropdown } from "semantic-ui-react";
const Header = () => {
  return (
    <div>
      <Head>
        <title>Sunrise Lightprocessor</title>
        <meta name="description" content="Sunrise Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu attached="top" inverted size="huge" style={{ paddingTop: "20px" }}>
        <Container>
          <Menu.Item as="a" header href="/">
            <Image size="small" src="/logo.png" style={{ marginRight: "1.5em" }} />
            Sunrise Lightprocessor
          </Menu.Item>
          <Menu.Item as="a">Geräte</Menu.Item>
          <Menu.Item position="right">
            <Input
              className="icon"
              icon="search"
              placeholder="Suchen..."
              action={{ type: "submit" }}
            />
          </Menu.Item>
          <Dropdown item icon="settings">
            <Dropdown.Menu>
              <Dropdown.Item href="/settings#log">Logging</Dropdown.Item>
              <Dropdown.Item href="/settings#address">Adressen</Dropdown.Item>
              <Dropdown.Item href="/settings#version">Version</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>
    </div>
  );
};
export default Header;
