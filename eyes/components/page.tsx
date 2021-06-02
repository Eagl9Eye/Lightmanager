import { Footer, Header } from "../components";
import { Container } from "semantic-ui-react";

const Page = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <Container text style={{ marginTop: "2em", minHeight: "100vh" }}>
        {children}
      </Container>
      <Footer></Footer>
    </div>
  );
};
export default Page;
