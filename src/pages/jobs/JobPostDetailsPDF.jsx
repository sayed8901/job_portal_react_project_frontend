import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import PropTypes from "prop-types";

// creating some styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "bold",
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
  },
});

const JobDetailsPDF = ({ post }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{post.job_title}</Text>
        <Text style={styles.text}>Company: {post.employer.company_name}</Text>
        <Text style={styles.text}>Location: {post.job_location}</Text>
        <Text style={styles.text}>Salary: BDT {post.salary}/-</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Requirements</Text>
        <Text style={styles.text}>Education: {post.education}</Text>
        <Text style={styles.text}>Experience: {post.experience}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Responsibilities & Job Context</Text>
        <Text style={styles.text}>{post.job_context}</Text>
        <Text style={styles.text}>{post.job_responsibilities}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Compensation & Extra Benefits</Text>
        <Text style={styles.text}>Salary: {post.salary}</Text>
        <Text style={styles.text}>Other Benefits: {post.other_benefits}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Company Information</Text>
        <Text style={styles.text}>
          Company Name: {post.employer.company_name}
        </Text>
        <Text style={styles.text}>
          Address: {post.employer.company_address}
        </Text>
        <Text style={styles.text}>
          Business Info: {post.employer.business_info}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Application Instructions</Text>
        <Text style={styles.text}>{post.application_instructions}</Text>
      </View>
    </Page>
  </Document>
);

export default JobDetailsPDF;

// propTypes validation
JobDetailsPDF.propTypes = {
  post: PropTypes.object.isRequired,
};
