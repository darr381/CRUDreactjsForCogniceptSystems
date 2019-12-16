--
-- PostgreSQL database dump
--

-- Dumped from database version 10.11
-- Dumped by pg_dump version 10.11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: first; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.first (
    s_num integer NOT NULL,
    uuid uuid DEFAULT public.gen_random_uuid(),
    error_type text,
    error_code text,
    error_description text,
    resolution timestamp with time zone,
    robot_tags text[]
);


ALTER TABLE public.first OWNER TO postgres;

--
-- Data for Name: first; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.first (s_num, uuid, error_type, error_code, error_description, resolution, robot_tags) FROM stdin;
12	451295e5-53b9-487d-be54-427cc9b3ff76	ewq	\N	dsadsadad	2002-02-02 00:00:00+08	{dsa,dsadss}
1222	f463b2ff-6725-4fc8-9770-b8ce330fa1b4	ewq	\N	dsadsadad	2002-02-02 00:00:00+08	{dsa,dsadss}
\.


--
-- Name: first first_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.first
    ADD CONSTRAINT first_pkey PRIMARY KEY (s_num);


--
-- PostgreSQL database dump complete
--

