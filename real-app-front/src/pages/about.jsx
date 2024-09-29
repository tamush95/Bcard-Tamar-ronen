import PageHeader from "../components/common/pageHeader";
import Logo from "../components/logo";

function About() {
  return (
    <div className="container">
      <PageHeader
        title={
          <>
            About <Logo />
          </>
        }
        description="something about me and this App"
      />
    </div>
  );
}

export default About;
