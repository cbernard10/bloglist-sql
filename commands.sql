CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Michael Liendo', 'https://dev.to/focusotter/create-a-public-api-by-web-scraping-in-nextjs-2f5n', 'Create a public API by web scraping in NextJS');
