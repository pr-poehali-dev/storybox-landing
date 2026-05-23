import LegalLayout from "./LegalLayout";

const PDF_URL =
  "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/0c557750-eff2-4d6a-90bf-4933528b0500.pdf";

export default function DataConsent() {
  return (
    <LegalLayout title="Согласие на обработку персональных данных" pdfUrl={PDF_URL}>
      <p style={{ color: "#7A7A7A", marginBottom: 16 }}>
        Полный текст документа доступен для просмотра выше или для скачивания в формате PDF.
      </p>
      <p style={{ marginBottom: 12 }}>
        Настоящее Согласие на обработку персональных данных оформляется в соответствии с требованиями
        Федерального закона № 152-ФЗ «О персональных данных».
      </p>
      <p style={{ marginBottom: 12 }}>
        Заполняя форму на сайте или передавая свои данные иным способом, вы подтверждаете своё
        согласие на их обработку в целях оказания услуг сервиса StoryBox.
      </p>
      <p style={{ color: "#7A7A7A", fontSize: 13 }}>
        По вопросам отзыва согласия:{" "}
        <a href="mailto:hello@storybox.ru" style={{ color: "#00A4E3" }}>
          hello@storybox.ru
        </a>
      </p>
    </LegalLayout>
  );
}
