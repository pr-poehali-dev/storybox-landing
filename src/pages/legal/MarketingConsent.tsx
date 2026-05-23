import LegalLayout from "./LegalLayout";

const PDF_URL =
  "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/10e55556-bf85-4fb9-b7fa-b97a23e5cef3.pdf";

export default function MarketingConsent() {
  return (
    <LegalLayout title="Политика обработки персональных данных и согласие на получение рассылок" pdfUrl={PDF_URL}>
      <p style={{ color: "#7A7A7A", marginBottom: 16 }}>
        Полный текст документа доступен для просмотра выше или для скачивания в формате PDF.
      </p>
      <p style={{ marginBottom: 12 }}>
        Настоящий документ описывает порядок обработки персональных данных для целей направления
        рекламных и информационных сообщений, а также условия получения согласия субъекта данных.
      </p>
      <p style={{ marginBottom: 12 }}>
        Вы можете в любой момент отказаться от получения рассылок, направив запрос на электронную
        почту или воспользовавшись ссылкой отписки в письме.
      </p>
      <p style={{ color: "#7A7A7A", fontSize: 13 }}>
        Отписаться от рассылок:{" "}
        <a href="mailto:hello@storybox.ru" style={{ color: "#00A4E3" }}>
          hello@storybox.ru
        </a>
      </p>
    </LegalLayout>
  );
}
