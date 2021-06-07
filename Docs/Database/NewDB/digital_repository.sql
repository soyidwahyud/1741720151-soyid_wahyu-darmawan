-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2021 at 02:31 AM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `digital_repository`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id_admin` int(11) NOT NULL,
  `nama_admin` varchar(100) NOT NULL,
  `username_admin` varchar(100) NOT NULL,
  `email_admin` varchar(100) NOT NULL,
  `password_admin` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id_admin`, `nama_admin`, `username_admin`, `email_admin`, `password_admin`) VALUES
(1, 'admin', 'admin', 'admin@gmail.com', '$2b$12$h1PC7eZ2lUWj1ZpmrONLle11CZbKNFtEH54m9ddfb3F6fpej8tnb2'),
(2, 'wahyu', 'wdarma', 'wdarma56@gmail.com', '$2b$12$qDh0P.Lfwu3OXpf2.40a0uHpcFupvbgIZK8zqNqgyMtjayWyGtrx6'),
(3, 'darmawan', 'darmawan', 'darmawan24@gmail.com', '$2b$12$ieGmEp8SaDZeHFMxAFB.8emZNsUB7TE7vsz2tszSW4JgvFjgyXoje');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_buku`
--

CREATE TABLE `tbl_buku` (
  `id_buku` int(11) NOT NULL,
  `kode_buku` varchar(100) NOT NULL,
  `nama_buku` varchar(255) NOT NULL,
  `id_jenis` int(11) NOT NULL,
  `id_nakes` int(11) NOT NULL,
  `id_penerbit` int(11) NOT NULL,
  `id_penulis` int(11) NOT NULL,
  `gambar` varchar(255) NOT NULL,
  `userfile` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_buku`
--

INSERT INTO `tbl_buku` (`id_buku`, `kode_buku`, `nama_buku`, `id_jenis`, `id_nakes`, `id_penerbit`, `id_penulis`, `gambar`, `userfile`) VALUES
(1, 'B1', 'Leading and Managing in Nursing', 3, 2, 3, 2, 'TXUcJN4CaVokRA.JPG', 'fBWxPzsLHC8nuw.pdf'),
(2, 'B2', 'Assessment and Management of Clinical Problems', 3, 2, 4, 3, 'z1gqzu4HSZORDQ.JPG', 'b18LzB7SjFZcoQ.pdf'),
(3, 'B3', 'Nursing Interventions and Collaborative Management', 3, 2, 5, 4, 'CzswMq4T09pE5Q.JPG', 'JPqQmREDdXNTjA.pdf'),
(4, 'B4', 'Netter’s  Pediatrics', 4, 2, 6, 5, 'zDABGgqDfG23DQ.JPG', 'FZ0qWxLVrDQkQg.pdf'),
(5, 'B5', 'Bailey & Loves Essential Clinical Anatomy', 1, 1, 11, 12, 'UjDt8Lg_x-H0-w.JPG', 'lf4hQ7QriaixSQ.pdf'),
(6, 'B6', 'Larsens Human  Embryology', 7, 1, 10, 11, '6c_JGvY2DqneIg.JPG', 'otQ1waJeqwfa4Q.pdf'),
(7, 'B7', 'Atlas of Human Anatomy', 1, 1, 8, 7, 'o5xg8q60gR-kMQ.JPG', 'iCzfD1VG0RRkEA.pdf'),
(8, 'B8', 'Guyton and Hall Textbook of Medical Physiology', 2, 1, 5, 8, 'vyXO-WqIIGKEPw.JPG', '7H_Eu4hVRR1HSw.pdf'),
(9, 'B9', 'Drugs And Human Location', 5, 3, 3, 5, 'St3nn0-gNdzUdA.JPG', 'aeGCiPwsMJOdvA.pdf'),
(10, 'B10', 'PRESCRIBING FOR ELDERLY PATIENTS', 6, 3, 10, 10, '-ke0w4Tu1V-Owg.JPG', 'ro9WzAvxHQaqqA.pdf'),
(11, 'B11', 'Drug–Drug Interaction Primer', 5, 3, 7, 1, 'fAnlfIAWKPw7SA.JPG', 'Gj8PT_M3EG11ww.pdf'),
(12, 'B12', 'Clinical Manual of Drug  Interaction Principles for Medical Practice', 5, 3, 7, 6, '80K74lqvRatY5w.JPG', 'XhqwPtRPGFVXQQ.pdf'),
(13, 'B13', 'USMLE Step 2 CK Lecture Notes 2019 Pediatrics', 4, 2, 12, 13, 'Me-swiyfpkr6dQ.JPG', 'qaH6bz1tQUqbIQ.pdf'),
(14, 'B14', 'All-in-One Nursing Care Planning Resource Medical-Surgical', 3, 2, 5, 14, '65LcSMBcDmlOKQ.JPG', 'Cz5X4hPF_uGcIg.pdf'),
(15, 'B15', 'Fundamentals of Nursing', 3, 2, 1, 15, '0KifyZJ8mo91sw.JPG', 'yI-iaE0XgsJJzQ.pdf'),
(16, 'B16', 'Mosby’s Pharmacology Memory Notecards Visual, Mnemonic, and Memory Aids for Nurses', 9, 2, 3, 16, 'yPnAMxWjMX9V8w.JPG', 'UazcKHR8oqNQVQ.pdf'),
(17, 'B17', 'Netters Concise Radiologic Anatomy', 1, 1, 9, 17, 'sLnOThEmJmW8UQ.JPG', '_G9oapbjeFjxpw.pdf'),
(18, 'B18', 'Lecture Notes_ Radiology, 3rd Edition', 10, 1, 2, 18, 'VBKqj8wTSocS_w.JPG', '6oFnUvpvv1HH1Q.pdf'),
(19, 'B19', 'Diagnostic Radiology V.2', 10, 1, 13, 19, 'Qd_rQ-0OXlGLrA.JPG', 'kL1fv9nUK2QuSg.pdf'),
(20, 'B20', 'Diagnostic the Dog and Cat', 1, 1, 14, 20, 'j2uMMqvLzGj6XQ.JPG', '3Tm0h6NioZFjxw.pdf'),
(21, 'B21', 'PRIMER OF DIAGNOSTIC IMAGING, 4th Edition', 11, 1, 15, 21, '5RB3-lfse5-Cqw.JPG', 'RpD_tYm5tmf11A.pdf'),
(22, 'B22', 'Atlas of Anatomy Head, Neck and Neuroanatomy', 1, 1, 1, 22, '-R22H_wIfdbyQQ.JPG', 'GSr2BHBRE9diHQ.pdf'),
(23, 'B23', 'Yoga Anatomy', 1, 1, 16, 23, 'bU2L2vvfQ0idew.JPG', 'cg2Ugwxz-YB7rg.pdf'),
(24, 'B24', 'A Manual of Adverse Drug Interactions', 5, 3, 1, 25, 'klwKG6uAUqNw9w.JPG', 'FYcjtnzhZI3EmA.pdf'),
(25, 'B25', 'Adherence to Pediatric Medical Regimens', 12, 3, 18, 26, 'PvlsWYIsAE80ng.JPG', 'XOK8GMNrvUqoMQ.pdf'),
(26, 'B26', 'British National Formulary', 13, 3, 19, 27, 'oX9-nukKygneNg.JPG', 'FcYSrFp87dOvQg.pdf'),
(27, 'B27', 'British National Formulary for Children', 13, 3, 19, 27, 'a-bOYIbFcG_gdw.JPG', 'PW3xrb-mUF5i2A.pdf'),
(28, 'B28', 'Community Pharmacy Handbook', 5, 3, 20, 28, 'Dd979q6SE0egXQ.JPG', 'fwa5Jxmoxw1SWg.pdf'),
(29, 'B29', 'Drug interactions in infectious disease 2nd ed', 5, 3, 21, 29, 'SEsC8895dv8fgg.JPG', 'wyGdTZlEDhqIIw.pdf'),
(30, 'B30', 'Drug-Drug Interactions 2nd ed', 5, 3, 22, 30, 'Ndi3yK573kE-0Q.JPG', 'XYSjDcXY2SWkug.pdf'),
(31, 'B31', 'Drug-related problems in the elderly', 5, 3, 23, 31, 'GQ4hn0CxQdlgoQ.JPG', 'zcvQLgtAxEi6ZA.pdf'),
(32, 'B32', 'Drugs and Drugs 2nd Ed', 5, 3, 24, 32, 'T8gc0akFJKPj6g.JPG', 'imVZd8IqdPaR9w.pdf'),
(33, 'B33', 'Handbook of Drug Interactions - A Clinical and Forensic Guide', 5, 3, 25, 33, '0t95faTW4e6ejQ.JPG', '_EXCJddxGWK9IQ.pdf'),
(34, 'B34', 'MedFacts - Pocket Guide of Drug Interaction', 5, 3, 25, 34, '3pgvz_yXR7_mBQ.JPG', 'MqvM5uZ-c7c21Q.pdf'),
(35, 'B35', 'Neonatal Formulary 4 - Drugs in Pregnancy and the First Year of Life - A Pharmacopoeia', 13, 3, 26, 35, 'Tr3ifBmHIhhE5A.JPG', '_RTGqpSbBnBmqg.pdf'),
(36, 'B36', 'Neonatal Formulary 5 - Drug Use in Pregnancy and the First Year of Life', 13, 3, 27, 36, 'asdl2OszTAL_aQ.JPG', '4c4usUt6CvPvQA.pdf'),
(37, 'B37', 'Paediatric Handbook 8th Ed', 6, 3, 10, 37, '2iDnYYbtoq9foQ.JPG', 'jgAtLaGB8c5_bA.pdf'),
(38, 'B38', 'Pharmacotherapies for the Treatment of Opioid Dependence', 14, 3, 28, 38, 'WRho0UGoTWAGng.JPG', 'drolX38y5ErCsA.pdf'),
(39, 'B39', 'Pharmacotherapy of Diabetes - New Developments', 14, 3, 29, 39, '-g-4VSP_a2piXw.JPG', 'wuiz7ID9JFOEoA.pdf'),
(40, 'B40', 'Pharmacotherapy of Obesity', 5, 3, 30, 40, 'Orpk51hVAssPyw.JPG', 'U3SkvQELzOjNng.pdf'),
(41, 'B41', 'Pre-eclampsia - Etiology and Clinical Practice', 15, 3, 31, 41, 'bt1yQbxrHX0DVw.JPG', 'lIomJxWdf7mYTw.pdf'),
(42, 'B42', 'Prescribing in Diabetes', 6, 3, 32, 42, 't19H7SIHVst0xQ.JPG', 'nkJuZ8a17ckZuQ.pdf'),
(43, 'B43', 'Prescribing in Pregnancy 4th Ed', 6, 3, 33, 43, 'MuryrTGHqpHyXA.JPG', 'izS7iF_Z_YFb9w.pdf'),
(44, 'B44', 'Stockley Drug Interactions 8th Ed', 5, 3, 20, 44, 'gGq1xoyJKJiMqQ.JPG', 'Pdp3wSFUH81A7Q.pdf'),
(45, 'B45', 'Stockley Drug Interactions 2009 Pocket Companion', 5, 3, 34, 44, 'YDpnUIanu0Ur0Q.JPG', 'VkTeCXEaJs_XOQ.pdf'),
(46, 'B46', 'Veterinary Drug Handbook (Desk Edition)', 5, 3, 35, 45, 'wc57AzTEBVOl4Q.JPG', 'qpkdH8wbVA-XQQ.pdf'),
(47, 'B47', 'Davis Drug Guide for Nurses ', 5, 3, 36, 46, 'B_YaxVk1u4FLuw.JPG', 'BiW6wi4fWPlikg.pdf'),
(48, 'B48', 'Principles of Pharmacology The Pathophysiologic Basis of Drug Therapy ', 5, 3, 37, 47, 'F4vZeXYz8c5rGA.JPG', 'c54HoCIjXodu8g.pdf'),
(49, 'B49', 'The Addicted Brain Why We Abuse Drugs, Alcohol, and Nicotine (FT Press Science)', 5, 3, 6, 48, 'PBwkwykKpXedhg.JPG', 'K91cnfTI0kHUqg.pdf'),
(50, 'B50', 'Review of Medical Physiology', 2, 1, 17, 24, 'FhBZcUznfOjxMw.JPG', 'BMoSTnau4rTG7A.pdf'),
(51, 'B51', 'Draft', 1, 1, 1, 1, 'GlQmk1Kh5RP4jg.JPG', 'BEPWbwzoJ0OEvg.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_jenis`
--

CREATE TABLE `tbl_jenis` (
  `id_jenis` int(11) NOT NULL,
  `jenis_buku` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_jenis`
--

INSERT INTO `tbl_jenis` (`id_jenis`, `jenis_buku`) VALUES
(1, 'Anatomy'),
(2, 'Psychology'),
(3, 'Medikal surgical'),
(4, 'Pediatrik'),
(5, 'Drugs '),
(6, 'Prescribing'),
(7, 'Embryology'),
(8, 'Urology'),
(9, 'Pharmacology'),
(10, 'Radiology'),
(11, 'Diagnostic'),
(12, 'Medical Regimen'),
(13, 'Formulary'),
(14, 'Pharmacotheraphy'),
(15, 'Etiology');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_kriteria`
--

CREATE TABLE `tbl_kriteria` (
  `id_kriteria` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nama_kriteria` varchar(100) NOT NULL,
  `bobot` float NOT NULL,
  `tipe_kriteria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_kriteria`
--

INSERT INTO `tbl_kriteria` (`id_kriteria`, `kode`, `nama_kriteria`, `bobot`, `tipe_kriteria`) VALUES
(1, 'C1', 'kelayakan isi', 0.3, 'benefit'),
(2, 'C2', 'kebahasaan', 0.25, 'benefit'),
(3, 'C3', 'penyajian', 0.28, 'benefit'),
(4, 'C4', 'kegrafikaan', 0.17, 'benefit');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_nakes`
--

CREATE TABLE `tbl_nakes` (
  `id_nakes` int(11) NOT NULL,
  `tenaga_kesehatan` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_nakes`
--

INSERT INTO `tbl_nakes` (`id_nakes`, `tenaga_kesehatan`) VALUES
(1, 'Kedokteran'),
(2, 'Keperawatan'),
(3, 'Farmasi');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_nilai_buku`
--

CREATE TABLE `tbl_nilai_buku` (
  `id_nilai_buku` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_buku` int(11) NOT NULL,
  `kelayakan_isi` float NOT NULL,
  `kebahasaan` float NOT NULL,
  `penyajian` float NOT NULL,
  `kegrafikaan` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_nilai_buku`
--

INSERT INTO `tbl_nilai_buku` (`id_nilai_buku`, `id_user`, `id_buku`, `kelayakan_isi`, `kebahasaan`, `penyajian`, `kegrafikaan`) VALUES
(1, 4, 1, 6, 5, 7, 8),
(2, 4, 2, 9, 6, 8, 5),
(3, 4, 3, 4, 4, 8, 6),
(4, 4, 4, 5, 7, 6, 6),
(5, 4, 33, 5, 7, 2, 3),
(6, 4, 7, 5, 4, 6, 4),
(7, 4, 15, 3, 4, 7, 10),
(8, 4, 9, 3, 4, 2, 8),
(9, 5, 1, 8, 8, 8, 9),
(10, 6, 33, 9, 9, 8, 9),
(11, 5, 4, 2, 4, 6, 10),
(12, 5, 5, 3, 4, 7, 10),
(13, 5, 3, 5, 6, 7, 4),
(14, 5, 8, 5, 7, 4, 9),
(15, 5, 12, 7, 8, 8, 4),
(16, 5, 10, 2, 3, 5, 9),
(17, 6, 2, 3, 2, 8, 4),
(18, 6, 3, 4, 5, 8, 7),
(19, 6, 6, 2, 2, 3, 6),
(20, 6, 13, 4, 3, 5, 4),
(21, 6, 14, 4, 6, 9, 6),
(22, 6, 37, 4, 5, 8, 6),
(23, 5, 15, 6, 9, 4, 4),
(24, 6, 41, 7, 5, 6, 9);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_penerbit`
--

CREATE TABLE `tbl_penerbit` (
  `id_penerbit` int(11) NOT NULL,
  `nama_penerbit` varchar(100) NOT NULL,
  `tahun_terbit` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_penerbit`
--

INSERT INTO `tbl_penerbit` (`id_penerbit`, `nama_penerbit`, `tahun_terbit`) VALUES
(1, 'Elsevier', '2017'),
(2, 'Wiley-Blackwell', '2010'),
(3, 'Elsevier', '2019'),
(4, 'Elsevier', '2020'),
(5, 'Elsevier', '2016'),
(6, 'Elsevier', '2011'),
(7, 'American Psychiatric', '2007'),
(8, 'Elsevier', '2018'),
(9, 'Elsevier', '2014'),
(10, 'Wiley-Blackwell', '2009'),
(11, 'Paperback', '2018'),
(12, 'Kaplan Medical', '2019'),
(13, 'Elsevier', '2015'),
(14, 'Saunders Company', '2000'),
(15, 'Elsevier', '2007'),
(16, 'Breath Thurst', '2007'),
(17, 'McGraw Hill', '2019'),
(18, 'Paperback', '2014'),
(19, 'BMJ Group', '2009'),
(20, 'Pharmaceutical press', '2008'),
(21, 'Humana Press', '2018'),
(22, 'Informa Healthcare', '2008'),
(23, 'Springer', '2009'),
(24, 'Springer', '2006'),
(25, 'Humana Press', '2004'),
(26, 'BMJ Books', '2003'),
(27, 'Wiley-Blackwell', '2007'),
(28, 'Informa Healthcare', '2009'),
(29, 'Springer', '2007'),
(30, 'Birkhauser', '2008'),
(31, 'Cambridge', '2007'),
(32, 'Cambridge', '2008'),
(33, 'Wiley-Blackwell', '2008'),
(34, 'Pharmaceutical Press', '2009'),
(35, 'Lowa University', '1999'),
(36, 'Davis Company', '2019'),
(37, 'Wolters Kluwer', '2017');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_penulis`
--

CREATE TABLE `tbl_penulis` (
  `id_penulis` int(11) NOT NULL,
  `nama_penulis` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_penulis`
--

INSERT INTO `tbl_penulis` (`id_penulis`, `nama_penulis`) VALUES
(1, 'Neil B. Sandsom'),
(2, 'Patricia S. Yoder-Wise'),
(3, 'Harding Kwong Roberts'),
(4, 'Marianne Saunorus Baird'),
(5, 'Todd A. Florin'),
(6, 'Gary H. Wynn'),
(7, 'Frank H. Netter'),
(8, 'John E. Hall'),
(9, 'Edwar C. Webber'),
(10, 'Stephen Jackson'),
(11, 'Gary C. Schoenwolf'),
(12, 'John S.P. Lumley'),
(13, 'William G'),
(14, 'Pamela L. Swearigan'),
(15, 'Patricia Potter'),
(16, 'Joann Zerwekh'),
(17, 'Joel Vilensky'),
(18, 'Pradip Patel'),
(19, 'Andreas Adam'),
(20, 'Kevin Kealy'),
(21, 'Ralph Weisledder'),
(22, 'Friedrich Paulsen'),
(23, 'Leslie Kominoff'),
(24, 'Kim Berret'),
(25, 'J. P. Griffin'),
(26, 'Michael Rapoff'),
(27, 'Media GMBH'),
(28, 'Jon Waterfield'),
(29, 'Stephen Particelli'),
(30, 'David Rodriguez'),
(31, 'Patrik Midlov'),
(32, 'Hamilton'),
(33, 'Ashraf Mozayani'),
(34, 'George Bailie'),
(35, 'Catherine Hall'),
(36, 'Vicky Pittman'),
(37, 'Kate Thompson'),
(38, 'Richard Matick'),
(39, 'Erik Morgensen'),
(40, 'Michael Parnham'),
(41, 'Fiona Lyall'),
(42, 'Jill Hill'),
(43, 'Peter Rubin'),
(44, 'Karen Baxter'),
(45, 'Donald Plumb'),
(46, 'Hazard Vallerand'),
(47, 'David Golan'),
(48, 'Michael Kuhar');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ulasan`
--

CREATE TABLE `tbl_ulasan` (
  `id_ulasan` int(11) NOT NULL,
  `nama_depan` varchar(100) NOT NULL,
  `nama_belakang` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `judul` varchar(100) NOT NULL,
  `pesan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ulasan`
--

INSERT INTO `tbl_ulasan` (`id_ulasan`, `nama_depan`, `nama_belakang`, `email`, `judul`, `pesan`) VALUES
(1, 'Soyid', 'Wahyu', 'wahyu@email.com', 'ini judul', 'ini pesan');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id_user` int(11) NOT NULL,
  `nik` varchar(11) NOT NULL,
  `nama_user` varchar(100) NOT NULL,
  `username_user` varchar(100) NOT NULL,
  `email_user` varchar(100) NOT NULL,
  `password_user` varchar(100) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `notelp` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id_user`, `nik`, `nama_user`, `username_user`, `email_user`, `password_user`, `alamat`, `notelp`) VALUES
(1, '010101', 'user', 'user', 'user@gmail.com', '$2b$12$YQ5PQp/Mvkt8tJUDjTxGlebrJne1KSnG7Rviu2.JjigGdhSZL3wau', 'Bekasi', '08113145679'),
(2, '123456', 'wahyu', 'wahyu', 'wahyu@y.com', '$2b$12$fATtHkDjxt4OTwJqGhOHiem5N9BIaZK1TGoP8VX9EZvF0v0FFK8BK', 'jakarta', '02187656651'),
(3, '121212121', 'tes', 'tes', 'tes@ymail.com', '$2b$12$HJj3ojGv3BgWvw6EY7Dnp.cv/CQpJhWKj1ySr8TGvmJQeRfQndjbS', 'tes', '0123987676'),
(4, '120370', 'Etty Supraptiningsih', 'etty12', 'etty12@yahoo.com', '$2b$12$ozEvHUI0/P6mC6YP5hyhzOp.suQicqj5fTGtOhCxwgumQAqsUZhpS', 'Gang Seni, Kampung Payangan, Jatiasih, Bekasi 17426', '081316024074'),
(5, '930075', 'Ns Dwi Rohyani  S.Kep.,M.Kep', 'Dwi174', 'dwinia0974@gmail.com', '$2b$12$dX1iqrzoV0U/OBix5p6hMu20eGDSTwDfGnnwAJTmg.g5fIBEaI5.O', 'Jln SMEA 6 RT 005 RW 09 No 19 Kel Cawang JakTim', '081383279802'),
(6, '960211', 'Tita Yanti', 'Tita', 'yanti.tita@gmail.com', '$2b$12$uMkOAEz8quvPwwQXAQBaueSBItmLyfFiEwuAxOQY6T4snn1hXDMKS', 'Kp. Dukuh, RT 003/01 No. 106 Serua Ciputat, Tangsel', '08569883352'),
(7, '24081999', 'darmawan', 'darmawan', 'darmawanwahyu@gmail.com', '$2b$12$SETrmp3mPNCfZ8t.NBqHcOJ8wZAmUQzb4kMYMp/2gEBGgt1ogY3SS', 'Bekasi', '081316024074');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `tbl_buku`
--
ALTER TABLE `tbl_buku`
  ADD PRIMARY KEY (`id_buku`),
  ADD KEY `id_jenis` (`id_jenis`),
  ADD KEY `id_penerbit` (`id_penerbit`),
  ADD KEY `id_penulis` (`id_penulis`),
  ADD KEY `id_nakes` (`id_nakes`);

--
-- Indexes for table `tbl_jenis`
--
ALTER TABLE `tbl_jenis`
  ADD PRIMARY KEY (`id_jenis`);

--
-- Indexes for table `tbl_kriteria`
--
ALTER TABLE `tbl_kriteria`
  ADD PRIMARY KEY (`id_kriteria`);

--
-- Indexes for table `tbl_nakes`
--
ALTER TABLE `tbl_nakes`
  ADD PRIMARY KEY (`id_nakes`);

--
-- Indexes for table `tbl_nilai_buku`
--
ALTER TABLE `tbl_nilai_buku`
  ADD PRIMARY KEY (`id_nilai_buku`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_buku` (`id_buku`);

--
-- Indexes for table `tbl_penerbit`
--
ALTER TABLE `tbl_penerbit`
  ADD PRIMARY KEY (`id_penerbit`);

--
-- Indexes for table `tbl_penulis`
--
ALTER TABLE `tbl_penulis`
  ADD PRIMARY KEY (`id_penulis`);

--
-- Indexes for table `tbl_ulasan`
--
ALTER TABLE `tbl_ulasan`
  ADD PRIMARY KEY (`id_ulasan`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id_user`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_buku`
--
ALTER TABLE `tbl_buku`
  ADD CONSTRAINT `tbl_buku_ibfk_1` FOREIGN KEY (`id_jenis`) REFERENCES `tbl_jenis` (`id_jenis`),
  ADD CONSTRAINT `tbl_buku_ibfk_2` FOREIGN KEY (`id_penerbit`) REFERENCES `tbl_penerbit` (`id_penerbit`),
  ADD CONSTRAINT `tbl_buku_ibfk_3` FOREIGN KEY (`id_penulis`) REFERENCES `tbl_penulis` (`id_penulis`),
  ADD CONSTRAINT `tbl_buku_ibfk_4` FOREIGN KEY (`id_nakes`) REFERENCES `tbl_nakes` (`id_nakes`);

--
-- Constraints for table `tbl_nilai_buku`
--
ALTER TABLE `tbl_nilai_buku`
  ADD CONSTRAINT `tbl_nilai_buku_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `tbl_user` (`id_user`),
  ADD CONSTRAINT `tbl_nilai_buku_ibfk_3` FOREIGN KEY (`id_buku`) REFERENCES `tbl_buku` (`id_buku`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
