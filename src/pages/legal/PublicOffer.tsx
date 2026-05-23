import LegalLayout from "./LegalLayout";

const PDF_URL =
  "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/0ee8885f-9922-46c7-917c-29535d5f723e.pdf";

export default function PublicOffer() {
  return (
    <LegalLayout title="Договор публичной оферты" pdfUrl={PDF_URL}>
      <p style={{ color: "#7A7A7A", marginBottom: 16 }}>
        Полный текст документа доступен для просмотра выше или для скачивания в формате PDF.
      </p>
      <p style={{ marginBottom: 12 }}>
        Настоящий Договор является публичной офертой в соответствии со ст. 437 ГК РФ. Оплачивая
        услуги StoryBox, вы принимаете условия настоящего договора в полном объёме.
      </p>
      <p style={{ marginBottom: 12 }}>
        Документ регулирует порядок оказания услуг, права и обязанности сторон, условия оплаты,
        возврата и разрешения споров.
      </p>
      <p style={{ color: "#7A7A7A", fontSize: 13 }}>
        По вопросам договора:{" "}
        <a href="mailto:hello@storybox.ru" style={{ color: "#00A4E3" }}>
          hello@storybox.ru
        </a>
      </p>
    </LegalLayout>
  );
}
