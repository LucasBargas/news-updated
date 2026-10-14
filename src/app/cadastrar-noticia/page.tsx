import getCategoriesList from "@/src/actions/categories-actions/get-categories-list";
import { Forms } from "@/src/components/forms";

const RegisterPage = async () => {
  const data = await getCategoriesList();
  return (
    <section className="container">
      <Forms categoriesList={data} />
    </section>
  );
};

export default RegisterPage;
