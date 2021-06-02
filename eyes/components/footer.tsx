import styles from "../styles/Footer.module.css";
import { Container, Divider, Icon, Image, List, Segment } from "semantic-ui-react";
const Footer = () => {
  const moveToTop = () => {
    window.scrollTo({ left: 0, top: 0 });
  };
  return (
    <Segment className={styles.footer} inverted vertical>
      <Container textAlign="center">
        <Icon
          circular
          inverted
          size="big"
          color="blue"
          name="angle double up"
          className={styles.backButton}
          onClick={moveToTop}
        />
        <Image centered size="medium" src="/logo.png" />
        <Divider inverted section />
        <List horizontal inverted divided link size="small">
          <List.Item as="a" href="https://github.com/Eagl9Eye/Lightmanager">
            Eagl9Eye/Lightmanager
          </List.Item>
          <List.Item as="a" href="#">
            Nutzungsbedingungen
          </List.Item>
          <List.Item as="a" href="mailto:siedlerhannes@5x2.de?subject=Lightprocessor">
            Kontakt
          </List.Item>
        </List>
      </Container>
    </Segment>
  );
};
export default Footer;
