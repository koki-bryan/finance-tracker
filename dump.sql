--
-- PostgreSQL database dump
--

\restrict Q8fHeQx3Qqx2xeImOHScDVL1x5AVUt9a7GPH9iBndf613ikUVCauGAnL3UH50X5

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    type text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT categories_type_check CHECK ((type = ANY (ARRAY['income'::text, 'expense'::text])))
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    category_id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    description text,
    date date NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transactions_id_seq OWNER TO postgres;

--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    full_name text NOT NULL,
    email character varying(255) NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, type, created_at) FROM stdin;
1	Salary	income	2026-03-30 15:19:45.981541+08
2	Freelance	income	2026-03-30 15:19:45.981541+08
3	Investment	income	2026-03-30 15:19:45.981541+08
4	Gift	income	2026-03-30 15:19:45.981541+08
5	Refund	income	2026-03-30 15:19:45.981541+08
6	Other	income	2026-03-30 15:19:45.981541+08
7	Housing	expense	2026-03-30 15:19:45.981541+08
8	Transportation	expense	2026-03-30 15:19:45.981541+08
9	Food & Dining	expense	2026-03-30 15:19:45.981541+08
10	Utilities	expense	2026-03-30 15:19:45.981541+08
11	Healthcare	expense	2026-03-30 15:19:45.981541+08
12	Entertainment	expense	2026-03-30 15:19:45.981541+08
13	Shopping	expense	2026-03-30 15:19:45.981541+08
14	Personal Care	expense	2026-03-30 15:19:45.981541+08
15	Education	expense	2026-03-30 15:19:45.981541+08
16	Other	expense	2026-03-30 15:19:45.981541+08
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (id, user_id, category_id, amount, description, date, created_at) FROM stdin;
1	10	1	8500.00	Salary for last half of March 2026	2026-03-30	2026-03-30 18:24:17.646691
3	10	7	2550.10	Rent Payment	2026-04-10	2026-03-30 18:32:02.430214
4	10	2	850.00	SM Supermarket run	2026-03-31	2026-03-31 00:51:05.27018
7	10	13	1349.40	mouse gaming	2025-04-07	2026-04-07 14:58:55.671507
8	12	1	7499.50	Salary for the 1st half of the month	2026-04-08	2026-04-08 10:54:08.007066
9	10	5	5432.10	SM Store appliance refund	2026-04-01	2026-04-08 12:15:58.518735
10	10	2	1000.27	Website creation	2026-04-01	2026-04-08 12:16:49.811065
11	10	13	7000.00	Table Tennis blade Viscaria	2026-04-08	2026-04-08 12:19:04.514841
12	10	13	3499.00	Table Tennis Rubber Dignics 09C	2026-04-08	2026-04-08 12:19:42.650088
13	10	6	15000.00	Salary for the first half of this month	2026-04-08	2026-04-08 15:20:52.199912
14	10	10	450.00	Electricity	2026-04-09	2026-04-10 15:47:05.948406
16	10	11	890.61	Monthly checkup	2026-04-12	2026-04-12 22:00:20.989334
17	10	1	7000.00	Salary 1	2026-04-13	2026-04-13 16:36:32.064706
18	10	1	45000.00	sALARY 2	2026-04-13	2026-04-13 16:37:01.740914
19	10	10	9800.00	DDR5 RAM purchase	2026-04-13	2026-04-13 16:46:28.901634
21	13	1	6587.50	Call Center 1st half salary	2026-04-13	2026-04-13 16:59:47.563708
22	14	1	55000.67	1st half salary	2026-04-13	2026-04-13 19:57:52.344095
23	14	9	798.00	Samg Treat	2026-04-13	2026-04-13 19:58:20.658056
24	14	7	12000.00	Rent	2026-04-13	2026-04-13 20:53:59.234956
25	14	8	500.00	Grab	2026-04-20	2026-04-13 20:54:31.472778
27	10	1	90.00	nd salary	2026-04-16	2026-04-17 01:14:31.42142
28	10	4	89.00	nd salary	2026-04-16	2026-04-17 01:16:00.203419
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, full_name, email, password_hash, created_at) FROM stdin;
2	Sandra De Jesus	sndrdjss@email.com	sandra_test1	2026-03-06 19:01:29.839846+08
3	brobro	brobro@email.com	$2b$13$lRVvGoxGQ2Y8uZHb3Hvo2etYK5LU5mfIhggntVyWVhHFnCwglhojO	2026-03-06 19:15:59.72622+08
4	cade	cade@email.com	$2b$13$bxbHB1v.bL7kjxRBKiQXr./GqPbHzT01di1tykkO2CNswmg/Hx3Pm	2026-03-06 19:40:23.350853+08
5	arma dindo	aram@gmail.com	$2b$13$z2rDRFc.6wulTB.7mFjLEO6j26MoV/pcwXaEUkZ1evHxoO.qGaxq.	2026-03-16 02:12:06.796938+08
7	sean tq	qt@gmail.com	$2b$13$Kfjsf7tFN6T6UDxSX3RM9uOWVjlPVHOimu83HJVgydmojIQVh5Lle	2026-03-17 03:00:53.705292+08
8	seazarin	sisa@email.com	$2b$13$q8h8gSFa37v18HhEZwDlkO/dgem8afxIcyKqwE5s8uTJyNme0xEES	2026-03-17 14:19:39.893918+08
9	pass ssap	pass@email.com	$2b$13$tyuwGsZH0M3qOlBSUUAbXOHd4ONFUBn.oBnfZTXvMPRy7JazaNcEq	2026-03-22 02:39:21.603303+08
10	Sean Bryan R. Noces	seanbryan.noces@gmail.com	$2b$13$dbTRvy7CWOFf35Hl2NYJwuY/duKUMXliwhbRNWrBE04cqa54OAhFi	2026-03-26 01:31:12.429438+08
11	Martini de Los Alas	martin@email.com	$2b$13$v5ogzjAEyV1kr1bAcZkCzuoLE8GA5XsJE1wqQBxzfrrdY0w9bvCni	2026-04-08 10:23:12.317463+08
12	Martini de Los Alas	gmail@gmail.com	$2b$13$dmQwCd1giexDb/n2aHzN7.J5e4Ka7o.W7iyhuIwQmfX.ohVlFBfSy	2026-04-08 10:24:28.057542+08
13	CA gonza	gonza@gmail.com	$2b$13$.ovmPxGlfLwDzQnlTCad4OuGTbb.7foweG.EFsAhMb624B6ErJcYG	2026-04-12 23:44:06.934774+08
14	Sandra De Jesus	sandra@gmail.com	$2b$13$a7RZXFSnkcnUSZMWP5mkbuMwX.VrboUvZpd22oxbrXIWA0FIpX.gm	2026-04-13 19:56:55.271915+08
15	test	test@gmailcom	$2b$13$1VzoGeWfSkMQTzjhuKt7FepFwTFH5wQvnB7tac9lqIBwEc.swrkPO	2026-04-17 00:34:36.807818+08
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 16, true);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_id_seq', 29, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 15, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: categories unique_name_type; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT unique_name_type UNIQUE (name, type);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: transactions fk_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE RESTRICT;


--
-- Name: transactions fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict Q8fHeQx3Qqx2xeImOHScDVL1x5AVUt9a7GPH9iBndf613ikUVCauGAnL3UH50X5

