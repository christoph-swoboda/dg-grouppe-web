-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 26, 2022 at 07:36 AM
-- Server version: 5.7.33
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `published` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `published`, `created_at`, `updated_at`) VALUES
(0, 'View All', 'view-all', 0, NULL, '2022-02-23 08:10:29'),
(1, 'Hot Dishes', 'hot-dishes', 0, NULL, NULL),
(2, 'Cold Dishes', 'cold-dishes', 0, NULL, '2022-02-23 09:43:19'),
(3, 'Soup', 'soup', 0, NULL, NULL),
(4, 'Grill', 'grill', 0, NULL, NULL),
(5, 'Appetizer', 'appetizer', 0, NULL, '2022-02-23 20:10:05'),
(6, 'Dessert', 'dessert', 0, NULL, '2022-02-23 20:10:25'),
(43, 'Experiment', 'experiment', 1, '2022-02-23 08:33:38', '2022-02-23 20:10:17');

-- --------------------------------------------------------

--
-- Table structure for table `discounts`
--

CREATE TABLE `discounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED DEFAULT NULL,
  `percentage` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_02_09_174741_create_products_table', 1),
(6, '2022_02_09_174758_create_categories_table', 1),
(7, '2022_02_09_174809_create_product_categories_table', 1),
(8, '2022_02_09_174819_create_orders_table', 1),
(9, '2022_02_09_174831_create_discounts_table', 1),
(10, '2022_02_09_174849_create_messages_table', 1),
(11, '2022_02_09_174909_create_notifications_table', 1),
(12, '2022_02_09_174928_create_reviews_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_id` bigint(20) UNSIGNED DEFAULT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `status` enum('processing','sent','delivered') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipped_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `instruction` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` int(11) NOT NULL,
  `delivery_method` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'myapptoken', '3026ce9ee8b002ee7a43d9cce882d47cf255b6332201c8bc592ba2689cb69e0d', '[\"*\"]', NULL, '2022-02-13 19:35:34', '2022-02-13 19:35:34'),
(2, 'App\\Models\\User', 2, 'myapptoken', '0a80b57989ba2264b672d20aaf2cd499a1749e05fd4f2a8e1b89ebffe7f2053a', '[\"*\"]', NULL, '2022-02-13 19:36:02', '2022-02-13 19:36:02'),
(3, 'App\\Models\\User', 1, 'myapptoken', '6826da82a7c68ab29f0f785d456796177c411f99a2e7e319455838db585dca0b', '[\"*\"]', NULL, '2022-02-13 19:37:39', '2022-02-13 19:37:39'),
(4, 'App\\Models\\User', 1, 'myapptoken', 'a4e2accfc2d64a2f43492c6868cfce5c97b7adec97a267975cf06e1145aa0840', '[\"*\"]', NULL, '2022-02-13 19:37:57', '2022-02-13 19:37:57'),
(5, 'App\\Models\\User', 1, 'myapptoken', '27e9101ff48338bb1ea5112cfed200fe6263953d61793882bf0c87f9a9dfad81', '[\"*\"]', NULL, '2022-02-13 19:38:11', '2022-02-13 19:38:11'),
(6, 'App\\Models\\User', 1, 'myapptoken', '4a96da8c2a47803aabdc3c3241af1348edc69a9589b830966d913333ae068ed5', '[\"*\"]', NULL, '2022-02-13 19:39:41', '2022-02-13 19:39:41'),
(7, 'App\\Models\\User', 1, 'myapptoken', '34bf11c56d1224c0c40bd3da4006245558ea393cbd583c0a93b40b2d5316caa8', '[\"*\"]', NULL, '2022-02-13 19:40:11', '2022-02-13 19:40:11'),
(8, 'App\\Models\\User', 1, 'myapptoken', 'a259e8418b96f14f5b9c46965066c624e46cbc4df780905bbd687eff79854713', '[\"*\"]', NULL, '2022-02-13 19:40:27', '2022-02-13 19:40:27'),
(9, 'App\\Models\\User', 1, 'myapptoken', '79070afc11f2d84080f46a144f7d62dd0ecc21ce65fb62e2181c618a91739608', '[\"*\"]', NULL, '2022-02-13 19:41:07', '2022-02-13 19:41:07'),
(10, 'App\\Models\\User', 3, 'myapptoken', '20e6c0cc74b59529853036fe29965bad91a4df9a9b5f312a356bebd31d53d1d5', '[\"*\"]', NULL, '2022-02-13 19:41:59', '2022-02-13 19:41:59'),
(11, 'App\\Models\\User', 3, 'myapptoken', 'a8a8a45e4101ca61885fb75c1c77eccaa298d5c3ee2c83d5418212bf580f4c86', '[\"*\"]', NULL, '2022-02-13 19:43:28', '2022-02-13 19:43:28'),
(12, 'App\\Models\\User', 3, 'myapptoken', '9e32726cac4ebe4512384e33b5a89a1851978ccdc21bb3d2f4dd4a2a421859ff', '[\"*\"]', NULL, '2022-02-13 19:44:35', '2022-02-13 19:44:35'),
(13, 'App\\Models\\User', 1, 'myapptoken', 'd60a527e3af7374e33dea6d350d2f144c3927ef238d2c61bde58b3845316b04f', '[\"*\"]', NULL, '2022-02-13 19:44:44', '2022-02-13 19:44:44'),
(14, 'App\\Models\\User', 1, 'myapptoken', '53d4a80521e839b5b3b02e61171a26dbe04fc6f3c2140c18729e2eb19d0d894a', '[\"*\"]', NULL, '2022-02-13 19:46:23', '2022-02-13 19:46:23'),
(15, 'App\\Models\\User', 1, 'myapptoken', '55093382d70b8c3d88f001efe35bd3ffe6eea36e264904bed7a7bed5915e3466', '[\"*\"]', NULL, '2022-02-13 19:46:52', '2022-02-13 19:46:52'),
(16, 'App\\Models\\User', 1, 'myapptoken', 'a501cf0c9a9d9efb9b66cf0ac7bb8f62d526652e0dad0d1b056747b7aed3e24e', '[\"*\"]', NULL, '2022-02-13 19:47:29', '2022-02-13 19:47:29'),
(17, 'App\\Models\\User', 1, 'myapptoken', '5cbb4d1191bf5eafb66d1c105a20a2b1d5dfe0240e361a33073a1954798ee851', '[\"*\"]', NULL, '2022-02-13 19:48:06', '2022-02-13 19:48:06'),
(18, 'App\\Models\\User', 1, 'myapptoken', '80e4a67f73d3088382a5234dd8bb39d5e6ee0d7dea3f6adb9a37250849510a8d', '[\"*\"]', NULL, '2022-02-13 19:48:43', '2022-02-13 19:48:43'),
(19, 'App\\Models\\User', 3, 'myapptoken', '3d05e755c7858cfa6998411ced17a9eecb91e264b04cf3c8f0bc97c34e8e2dd5', '[\"*\"]', NULL, '2022-02-13 19:48:54', '2022-02-13 19:48:54'),
(20, 'App\\Models\\User', 3, 'myapptoken', 'b74e71c3b478ad79f47e96581ee68254fd9191d403d4fefae8f0d79017d0c468', '[\"*\"]', NULL, '2022-02-13 19:49:02', '2022-02-13 19:49:02'),
(21, 'App\\Models\\User', 3, 'myapptoken', '6d93509e6995bd95c9629c136b63146af3cc1fb76629e3287c8ef941557a3272', '[\"*\"]', NULL, '2022-02-13 19:49:36', '2022-02-13 19:49:36'),
(22, 'App\\Models\\User', 1, 'myapptoken', '379c88cf454f771a555a6fbc560ca6ce59b2db297692874d13e4cdc39bf35b49', '[\"*\"]', NULL, '2022-02-13 19:49:43', '2022-02-13 19:49:43'),
(23, 'App\\Models\\User', 3, 'myapptoken', '2da8389b28164c0483be4f4571e26c312b69090f28970db73382d997112e0410', '[\"*\"]', NULL, '2022-02-13 19:49:58', '2022-02-13 19:49:58'),
(24, 'App\\Models\\User', 3, 'myapptoken', '3e99e1503975ab48e0844b6db129a0c5e4036d12bb65988cfe3e459c9b70cf9f', '[\"*\"]', NULL, '2022-02-13 19:50:06', '2022-02-13 19:50:06'),
(25, 'App\\Models\\User', 1, 'myapptoken', '6cb7808127c52cc9d066f45968d9793b3092470cce196e9cbee5b3f787bac176', '[\"*\"]', NULL, '2022-02-13 19:50:16', '2022-02-13 19:50:16'),
(26, 'App\\Models\\User', 1, 'myapptoken', '10976c608886a5cc8c13483516da0da5ef1d213bb42be99739530e339c0c4ad0', '[\"*\"]', NULL, '2022-02-13 19:50:53', '2022-02-13 19:50:53'),
(27, 'App\\Models\\User', 3, 'myapptoken', 'd7714a28b7251f76d49c3c2a3003ee0ea52e536ca8a2734109ef41380c60ec13', '[\"*\"]', NULL, '2022-02-13 19:51:00', '2022-02-13 19:51:00'),
(28, 'App\\Models\\User', 3, 'myapptoken', '32285558a52c87bfce5f3d9cc4f6812d52e5daea450fcf42b2430ac973aec2c3', '[\"*\"]', NULL, '2022-02-13 19:51:07', '2022-02-13 19:51:07'),
(29, 'App\\Models\\User', 1, 'myapptoken', '5de34992d92d615b066930cd3966857c34ff2c3c52d50906fd37b4dd2a346d27', '[\"*\"]', NULL, '2022-02-13 19:51:50', '2022-02-13 19:51:50'),
(30, 'App\\Models\\User', 3, 'myapptoken', '650f7be38db8c1d35cf8b89718b1f264b2bcbe4e279f6efd16b1683ea3604dc9', '[\"*\"]', NULL, '2022-02-13 19:52:37', '2022-02-13 19:52:37'),
(31, 'App\\Models\\User', 3, 'myapptoken', 'c5e0f8745aaee5859e61d7b4ca2aa0fcbd0dc065d286ddb18e26dd6abf317b4c', '[\"*\"]', NULL, '2022-02-13 19:53:13', '2022-02-13 19:53:13'),
(32, 'App\\Models\\User', 3, 'myapptoken', 'fecf5307ffe907684379182696434b1925fb9150492e55b104dc81ff47e4989f', '[\"*\"]', NULL, '2022-02-13 19:53:20', '2022-02-13 19:53:20'),
(33, 'App\\Models\\User', 1, 'myapptoken', 'a6de6f468a50165b643ffffdde4ab6b204e3ba9a3961496481f26e89394a6069', '[\"*\"]', NULL, '2022-02-13 19:53:28', '2022-02-13 19:53:28'),
(34, 'App\\Models\\User', 3, 'myapptoken', 'a252b357bae6685edfc84a93efad87e63f9caeded851460d4106685505c211b3', '[\"*\"]', NULL, '2022-02-13 19:53:48', '2022-02-13 19:53:48'),
(35, 'App\\Models\\User', 3, 'myapptoken', 'fd65b2ee1d09c3183aa1c0a4ce77779c1b4d072ba4a84e346299486be9250719', '[\"*\"]', NULL, '2022-02-13 19:53:56', '2022-02-13 19:53:56'),
(36, 'App\\Models\\User', 1, 'myapptoken', '9527d01b220715d4e80ebd3dd40c5e186b1ab3446120b2eef7d1bf200d63b619', '[\"*\"]', NULL, '2022-02-13 21:24:57', '2022-02-13 21:24:57'),
(37, 'App\\Models\\User', 1, 'myapptoken', 'af13fd03715060e764425007e7ff2fc46397f8e7a3ccc15f10098d2674f3f66a', '[\"*\"]', NULL, '2022-02-13 21:30:17', '2022-02-13 21:30:17'),
(38, 'App\\Models\\User', 1, 'myapptoken', 'cef671b41b881cbeb499712b9bd8120560a4c481a8cdeb78265f7dc343f372c7', '[\"*\"]', NULL, '2022-02-13 21:31:16', '2022-02-13 21:31:16'),
(39, 'App\\Models\\User', 1, 'myapptoken', '535a283cb90459ccf36fe68ed6ab10d91f8e04ac7a60717d4bf5464a459741d7', '[\"*\"]', NULL, '2022-02-13 21:31:59', '2022-02-13 21:31:59'),
(40, 'App\\Models\\User', 1, 'myapptoken', '86ce4c6dde84cafa0185d63805e9987e534a187544f09919d99468c75255e3d4', '[\"*\"]', NULL, '2022-02-13 21:33:25', '2022-02-13 21:33:25'),
(41, 'App\\Models\\User', 1, 'myapptoken', 'e9c9d8edb6bef74c916b5c0536e434d28bf780d3ee66c42d7d82f514f7dff7bb', '[\"*\"]', NULL, '2022-02-13 21:41:45', '2022-02-13 21:41:45'),
(42, 'App\\Models\\User', 1, 'myapptoken', '6b5d26cab2d782035b9966017633b4134bf76d0fbe9cfcc09e2c96974930a479', '[\"*\"]', NULL, '2022-02-13 21:44:15', '2022-02-13 21:44:15'),
(43, 'App\\Models\\User', 1, 'myapptoken', '4df1f589b8feab3b114e79fdc0b4907644038ac47bc097fb539226cb9e16654f', '[\"*\"]', NULL, '2022-02-13 21:46:18', '2022-02-13 21:46:18'),
(44, 'App\\Models\\User', 1, 'myapptoken', '2f9b4dbfacf654d038788756a65c281eb4d0cca3c945af44e690474603526d2f', '[\"*\"]', NULL, '2022-02-13 22:01:07', '2022-02-13 22:01:07'),
(45, 'App\\Models\\User', 4, 'myapptoken', '295b44bce730fb82d7ca0c133c0b00d9d26a3baa9188317b5a7f30e4bb4e0980', '[\"*\"]', NULL, '2022-02-13 22:42:10', '2022-02-13 22:42:10'),
(46, 'App\\Models\\User', 5, 'myapptoken', 'cb9327abc71120e6c7a0ed48299a7d3e66a3fe39d40e18b180125e14ed5df86c', '[\"*\"]', NULL, '2022-02-13 22:43:30', '2022-02-13 22:43:30'),
(47, 'App\\Models\\User', 6, 'myapptoken', '7ead1b6d466d51a1b293a0658d9d32c2f9312754d25daf351c29592c538eb82f', '[\"*\"]', NULL, '2022-02-13 22:45:30', '2022-02-13 22:45:30'),
(48, 'App\\Models\\User', 7, 'myapptoken', '6a161c10ff68777afee60888998f1515e8c57fe7e82d88d0545525d030a77464', '[\"*\"]', NULL, '2022-02-13 22:45:47', '2022-02-13 22:45:47'),
(49, 'App\\Models\\User', 1, 'myapptoken', '2aaa5b10daf761d8fc5ea0f6d1b6897973ea13e401b972e9c88540a88b946164', '[\"*\"]', NULL, '2022-02-13 22:46:17', '2022-02-13 22:46:17'),
(50, 'App\\Models\\User', 1, 'myapptoken', 'bf969309e0e53cd475dd5cb97999e68df32cd9e8736e6cde0fafc6794b08a140', '[\"*\"]', NULL, '2022-02-13 23:34:27', '2022-02-13 23:34:27'),
(51, 'App\\Models\\User', 3, 'myapptoken', 'bb444afc12b7f97dab4ce20d1fec2a34148d3f5252229865194ddae8b66a3fcb', '[\"*\"]', NULL, '2022-02-13 23:34:42', '2022-02-13 23:34:42'),
(52, 'App\\Models\\User', 3, 'myapptoken', '4b70751302765f50af61fc4b37f98444ea382bf2e65ea73ea9e5e6cc219ea99d', '[\"*\"]', NULL, '2022-02-13 23:36:33', '2022-02-13 23:36:33'),
(53, 'App\\Models\\User', 3, 'myapptoken', 'a3da31bb5f0bc45bf759be35aef945465d8782dca9991eba11d9da650382d3e8', '[\"*\"]', NULL, '2022-02-13 23:37:27', '2022-02-13 23:37:27'),
(54, 'App\\Models\\User', 1, 'myapptoken', '43292dea90a219e3073207959adc2283e096dbbf6181db43dad27a05981a4113', '[\"*\"]', NULL, '2022-02-14 02:20:23', '2022-02-14 02:20:23'),
(55, 'App\\Models\\User', 3, 'myapptoken', 'c5d2305a13afbb5a9e1c6aaa52f8b13f7baf1e703947c094615bbb83275fcb21', '[\"*\"]', NULL, '2022-02-20 07:13:03', '2022-02-20 07:13:03'),
(56, 'App\\Models\\User', 4, 'myapptoken', 'a9ac214b427ec0e64d2b7974418f852d829090f2b5eb9f96c9bc8250a1bbe2cb', '[\"*\"]', NULL, '2022-02-20 11:55:02', '2022-02-20 11:55:02'),
(57, 'App\\Models\\User', 3, 'myapptoken', '7f906464657451bbaa101f94444ea1c20f4cbd7a4d859d068d65603108d4f841', '[\"*\"]', NULL, '2022-02-20 11:57:07', '2022-02-20 11:57:07'),
(58, 'App\\Models\\User', 1, 'myapptoken', 'dcce039ad2ec183ea6b1ce7c33e4dbf1f5956ce877696a7e3a240fbee861ef46', '[\"*\"]', NULL, '2022-02-20 11:57:32', '2022-02-20 11:57:32'),
(59, 'App\\Models\\User', 3, 'myapptoken', 'e1fe7aca2f6498635160fe7e54be4fc4194b9edc28685eb0ab43b51c31f61eba', '[\"*\"]', NULL, '2022-02-21 03:58:49', '2022-02-21 03:58:49'),
(60, 'App\\Models\\User', 1, 'myapptoken', '8e0b9e83704505f491b7a5eb563d1a7913fe9b3f9879d123058820dc555c4955', '[\"*\"]', NULL, '2022-02-21 05:54:09', '2022-02-21 05:54:09'),
(61, 'App\\Models\\User', 1, 'myapptoken', 'f3c74d64f1941349d232276bddb5f1dd078c722a716db6a3d7c012ef1cb4377c', '[\"*\"]', NULL, '2022-02-21 06:04:57', '2022-02-21 06:04:57'),
(62, 'App\\Models\\User', 1, 'myapptoken', '61f692235b0e9a1bea6a90d58915709cb60b9ac8ed791371b29f9a8eb86c3d6d', '[\"*\"]', NULL, '2022-02-21 06:14:05', '2022-02-21 06:14:05'),
(63, 'App\\Models\\User', 1, 'myapptoken', '8359e0dd3866084568177f795f1667c6319fd4de8bb48956ea8524888a8f4fb1', '[\"*\"]', '2022-02-21 06:54:36', '2022-02-21 06:52:57', '2022-02-21 06:54:36'),
(64, 'App\\Models\\User', 1, 'myapptoken', '5075de30991f729f55e384531b52d6bc185d63e84eb022110dd805bbb984bf53', '[\"*\"]', '2022-02-21 07:05:26', '2022-02-21 07:04:46', '2022-02-21 07:05:26'),
(65, 'App\\Models\\User', 1, 'myapptoken', 'a585bde4006e61d3a040c45421a9b792bf98638943ced15e782943f93612e4ef', '[\"*\"]', '2022-02-21 07:07:59', '2022-02-21 07:06:49', '2022-02-21 07:07:59'),
(66, 'App\\Models\\User', 1, 'myapptoken', 'd38d7535e49bfe927df2011bbb6f51b2d7dd9c32d9e07109670b2b20ce051fe5', '[\"*\"]', NULL, '2022-02-21 07:14:51', '2022-02-21 07:14:51'),
(67, 'App\\Models\\User', 3, 'myapptoken', '3aa904152f13a19fb521d92e4b70b5f93e49fd3b4ca4ba3dea741666f575c2db', '[\"*\"]', NULL, '2022-02-21 07:26:52', '2022-02-21 07:26:52'),
(68, 'App\\Models\\User', 3, 'myapptoken', '52103f93d4abdb60ef7dbcddb8ea708a82bcc2e77c18e78cecbd946fc515d763', '[\"*\"]', NULL, '2022-02-21 07:45:28', '2022-02-21 07:45:28'),
(69, 'App\\Models\\User', 3, 'myapptoken', '6be976f98a0db2cf27201e3067125f25015d51e090f045864ac1e5b060f763eb', '[\"*\"]', NULL, '2022-02-21 07:48:48', '2022-02-21 07:48:48'),
(70, 'App\\Models\\User', 1, 'myapptoken', 'ee10d0489705bde354ad1fcf9b9c4cce6851dc0a5768c7f57203bcbb93638c4b', '[\"*\"]', NULL, '2022-02-21 08:02:04', '2022-02-21 08:02:04'),
(71, 'App\\Models\\User', 3, 'myapptoken', '95c0765e41339f9450de86ca95253e282ed5ecad4548c2ae65dd868ccfbfc168', '[\"*\"]', NULL, '2022-02-21 08:02:17', '2022-02-21 08:02:17'),
(72, 'App\\Models\\User', 3, 'myapptoken', '50e24bc12c171d17c8d42092b61b98e22ae2fba3969c616e7060e8d5130a0e41', '[\"*\"]', NULL, '2022-02-21 08:33:23', '2022-02-21 08:33:23'),
(73, 'App\\Models\\User', 3, 'myapptoken', '1532a9014088ea82ea662d9fe724fa40adf0b9a35249556d334202fd5f875dce', '[\"*\"]', NULL, '2022-02-21 08:35:14', '2022-02-21 08:35:14'),
(74, 'App\\Models\\User', 1, 'myapptoken', '6c773cadfc190245916eef47b1595d928c48678e4f095665494a0330fa40a879', '[\"*\"]', NULL, '2022-02-21 08:36:54', '2022-02-21 08:36:54'),
(75, 'App\\Models\\User', 3, 'myapptoken', '5f1b4bdc30e013e3b07f07ef5613e57cdd616f3f3e42294040c713f2ef4674ab', '[\"*\"]', NULL, '2022-02-21 09:29:33', '2022-02-21 09:29:33'),
(76, 'App\\Models\\User', 1, 'myapptoken', '359ef31f2540e5b4c52d31fe85f1b49e3ec7532b75081c85ebd5677432e703aa', '[\"*\"]', NULL, '2022-02-22 04:43:50', '2022-02-22 04:43:50'),
(77, 'App\\Models\\User', 3, 'myapptoken', 'ff2e01b9c12d1597cc7d451caf87155b7ad1578bb2834fab005644a6749f1e7f', '[\"*\"]', NULL, '2022-02-22 04:44:03', '2022-02-22 04:44:03'),
(78, 'App\\Models\\User', 3, 'myapptoken', '292f68fd3466a518033954a85afe4642f18d9d93cb544ed00f4819f05bbcc462', '[\"*\"]', NULL, '2022-02-22 04:46:02', '2022-02-22 04:46:02'),
(79, 'App\\Models\\User', 3, 'myapptoken', '90a284e3359927f104c9bd7989a626cfc6774576303ac5f04312c8559821cd49', '[\"*\"]', '2022-02-23 01:05:33', '2022-02-22 23:16:40', '2022-02-23 01:05:33'),
(80, 'App\\Models\\User', 3, 'myapptoken', '8fbc9195dfde09da6eaf6e965e8682aff4d574870afe0e8c223fae3c20e60f75', '[\"*\"]', NULL, '2022-02-23 01:24:38', '2022-02-23 01:24:38'),
(81, 'App\\Models\\User', 3, 'myapptoken', '808bf7ab6bba8cff4a8bf93d3423804fb9f75949ccc9892489ae3c800845ac19', '[\"*\"]', '2022-02-23 01:42:30', '2022-02-23 01:29:01', '2022-02-23 01:42:30'),
(82, 'App\\Models\\User', 3, 'myapptoken', '1a7630fd855fc20a94303cc81c436725a3d55a0d24260e211a0379dbd13763b3', '[\"*\"]', NULL, '2022-02-23 01:54:30', '2022-02-23 01:54:30'),
(83, 'App\\Models\\User', 3, 'myapptoken', '8776271b84dec846406447cadbdbc2368225772899695e5226d8e19cd928c4e8', '[\"*\"]', NULL, '2022-02-23 02:13:53', '2022-02-23 02:13:53'),
(84, 'App\\Models\\User', 3, 'myapptoken', '2b80b0b3c0e172e0aa1c4f0c4a3d7fa1eefce4a102407ae8226cdb1dff6bc7ab', '[\"*\"]', NULL, '2022-02-23 02:45:18', '2022-02-23 02:45:18'),
(85, 'App\\Models\\User', 3, 'myapptoken', 'd8d0abeee1c9029472724677f868c7882278106c073ccfe15e251c737f90e684', '[\"*\"]', NULL, '2022-02-23 02:52:58', '2022-02-23 02:52:58'),
(86, 'App\\Models\\User', 3, 'myapptoken', '71e009a803a08a370fde377705a30780c3250c0a9fbcb6d90dfeebda1441553b', '[\"*\"]', '2022-02-23 05:27:59', '2022-02-23 03:47:38', '2022-02-23 05:27:59'),
(87, 'App\\Models\\User', 3, 'myapptoken', '6fedf767de772a3a4c2febf2722d2e5c4a5c509f6e194372484cb7bee03098a4', '[\"*\"]', '2022-02-23 09:08:37', '2022-02-23 05:33:35', '2022-02-23 09:08:37'),
(88, 'App\\Models\\User', 3, 'myapptoken', '97d53cb970c4888d21b6555a2cc1ff7b428977e067e906170f61bb6745594af0', '[\"*\"]', NULL, '2022-02-23 05:33:35', '2022-02-23 05:33:35'),
(89, 'App\\Models\\User', 3, 'myapptoken', '1fdf9a14f680e8d1d784b8bf0b2ca124b8b44eb92bcea1794936b7d6d876912b', '[\"*\"]', NULL, '2022-02-23 09:17:14', '2022-02-23 09:17:14'),
(90, 'App\\Models\\User', 3, 'myapptoken', 'eb89d1d2b4d640be0bd7d6e58e83d87fc97c7826eed92700ffc40526bd8709b6', '[\"*\"]', '2022-02-23 20:10:25', '2022-02-23 09:42:25', '2022-02-23 20:10:25'),
(91, 'App\\Models\\User', 3, 'myapptoken', 'edb0261ff05179881a13b095846ea8a352dd34b7b20ce16b5079ef011270f0bc', '[\"*\"]', NULL, '2022-02-23 22:16:06', '2022-02-23 22:16:06'),
(92, 'App\\Models\\User', 3, 'myapptoken', '2a68b7307e1d28b487de11fb0d80de65467a01af0bffba1e26860a34cc12d69e', '[\"*\"]', NULL, '2022-02-23 22:17:16', '2022-02-23 22:17:16'),
(93, 'App\\Models\\User', 3, 'myapptoken', '0859ea5f9d392d8c05ed139e6136c3a8b3195d46662a117764124cd6bab446ae', '[\"*\"]', NULL, '2022-02-23 22:17:17', '2022-02-23 22:17:17'),
(94, 'App\\Models\\User', 3, 'myapptoken', 'a2c968abcdd0ddfb0156e14d928b673284652098d0922e69c4194e87544fee63', '[\"*\"]', NULL, '2022-02-23 22:17:55', '2022-02-23 22:17:55'),
(95, 'App\\Models\\User', 3, 'myapptoken', '632065255c8ec20ae8669a3392496a9d1f0652d5338b5cbc9d0c34a2f81cdfae', '[\"*\"]', NULL, '2022-02-23 22:18:03', '2022-02-23 22:18:03'),
(96, 'App\\Models\\User', 3, 'myapptoken', '30d29ead0553e8dc6c9bb1f40df7e5662df85446a25ad2d54d4b0b21a4f53c47', '[\"*\"]', NULL, '2022-02-23 22:19:21', '2022-02-23 22:19:21'),
(97, 'App\\Models\\User', 3, 'myapptoken', '0a1e502fadacbae610112e2c67e871542115a74a2d9766e9e8411a1478bbcb36', '[\"*\"]', NULL, '2022-02-23 22:20:59', '2022-02-23 22:20:59'),
(98, 'App\\Models\\User', 3, 'myapptoken', '82db016505a0750ceeb8ca1ab39f648630b13690789e7862b4125f39de0a285b', '[\"*\"]', NULL, '2022-02-23 22:26:31', '2022-02-23 22:26:31'),
(99, 'App\\Models\\User', 3, 'myapptoken', 'e0748c8292fd3eb79e5ceda9a84eede3f0e655feffaf679f524816ec2f8f0f9e', '[\"*\"]', NULL, '2022-02-23 22:27:44', '2022-02-23 22:27:44'),
(100, 'App\\Models\\User', 3, 'myapptoken', 'c7cf271149a2d9e51d0dde8d528ac339ad4598d8ff21e7f64ce060da85c6f6fb', '[\"*\"]', NULL, '2022-02-23 22:40:32', '2022-02-23 22:40:32'),
(101, 'App\\Models\\User', 3, 'myapptoken', 'ca1c07561be9137a20a8050deb3ee7963828d2cd66c2785eed82b67dcad96594', '[\"*\"]', NULL, '2022-02-23 22:47:23', '2022-02-23 22:47:23'),
(102, 'App\\Models\\User', 3, 'myapptoken', 'f0cadb36b004e614f054ae6e3df3751329f420781b79fcf847fbe8ca436ec1f1', '[\"*\"]', NULL, '2022-02-23 22:56:42', '2022-02-23 22:56:42'),
(103, 'App\\Models\\User', 3, 'myapptoken', '201833684d40352f100f60474d04fdf62269501e8f42cd886644fc09a5ef4486', '[\"*\"]', NULL, '2022-02-23 23:02:25', '2022-02-23 23:02:25'),
(104, 'App\\Models\\User', 1, 'myapptoken', 'b0e1473a0bebccd2cdbc57c210db0edb370508257fe25732714c75720b46bf62', '[\"*\"]', NULL, '2022-02-23 23:08:20', '2022-02-23 23:08:20'),
(105, 'App\\Models\\User', 3, 'myapptoken', '0dd6b94821896be1297b5e04bd4bba52895b51b3d3e8f890614f48ec5f0ce708', '[\"*\"]', '2022-02-24 01:47:52', '2022-02-23 23:09:11', '2022-02-24 01:47:52'),
(106, 'App\\Models\\User', 3, 'myapptoken', 'ca776827857c86bb1bcd7e1b4f739d71d95fd56e9e613671168a9e7de696bb35', '[\"*\"]', NULL, '2022-02-24 01:51:40', '2022-02-24 01:51:40'),
(107, 'App\\Models\\User', 3, 'myapptoken', '7782b9a1bc140c45f3a0030e8f89362815f0f4932fe3a779b0eb407e970d8877', '[\"*\"]', NULL, '2022-02-24 02:37:04', '2022-02-24 02:37:04'),
(108, 'App\\Models\\User', 3, 'myapptoken', 'f7ac8e0d803eb239d1425941626f4bdcab1aef40d0fea204254ad78f610f6274', '[\"*\"]', NULL, '2022-02-24 02:50:30', '2022-02-24 02:50:30'),
(109, 'App\\Models\\User', 3, 'myapptoken', 'dd8507b8a48df22aeb75686b65d8ec0ac0e791179db70d1f737c1d033f9b0523', '[\"*\"]', NULL, '2022-02-24 03:03:23', '2022-02-24 03:03:23'),
(110, 'App\\Models\\User', 3, 'myapptoken', 'baada52746a215c53c12171fbb1bc8c8ca934f79b193a79a7e7d947706f13c81', '[\"*\"]', '2022-02-24 03:17:31', '2022-02-24 03:13:15', '2022-02-24 03:17:31'),
(111, 'App\\Models\\User', 3, 'myapptoken', '3cdc23b18d4da0919ddb4e1a65b6cc78d45cbda09ee4956efcd34ce64220f731', '[\"*\"]', '2022-02-24 03:24:33', '2022-02-24 03:21:54', '2022-02-24 03:24:33'),
(112, 'App\\Models\\User', 3, 'myapptoken', '5fc4a93954d4540701df672948e69252ec803991ff3b9a360d695a2c4a423bf0', '[\"*\"]', NULL, '2022-02-24 03:26:25', '2022-02-24 03:26:25'),
(113, 'App\\Models\\User', 3, 'myapptoken', '582c40850bf2e0a4cebb5a80c7f7a3b660b19b6e0984d6190dc4fa5135ad8ff1', '[\"*\"]', NULL, '2022-02-24 03:29:37', '2022-02-24 03:29:37'),
(114, 'App\\Models\\User', 1, 'myapptoken', '53673705684b2b6ca3c707b034c457fd9e514755ec51af86e56c285397054a7b', '[\"*\"]', NULL, '2022-02-24 04:15:29', '2022-02-24 04:15:29'),
(115, 'App\\Models\\User', 3, 'myapptoken', 'f3fa27a38df50f528049ed5381ef08c6a1df9444677abc734a63ebfb438d10e5', '[\"*\"]', '2022-02-24 04:21:17', '2022-02-24 04:21:06', '2022-02-24 04:21:17'),
(116, 'App\\Models\\User', 3, 'myapptoken', 'a5cb8aa98daaa5f6a46480fdf9d3406bb5b4d04782489f95d41782d23371d6b2', '[\"*\"]', NULL, '2022-02-24 05:34:03', '2022-02-24 05:34:03'),
(117, 'App\\Models\\User', 3, 'myapptoken', '748a431d0becf5f997a982a3f6940fea4336e89d9153ba163de0209eb59423ca', '[\"*\"]', '2022-02-24 05:35:36', '2022-02-24 05:34:49', '2022-02-24 05:35:36'),
(118, 'App\\Models\\User', 3, 'myapptoken', 'c69ed37416c53d800f956771a14d005d4b738d21e1d73e99c24fe52166d73231', '[\"*\"]', NULL, '2022-02-24 05:43:08', '2022-02-24 05:43:08'),
(119, 'App\\Models\\User', 3, 'myapptoken', '5a9b612cf8e6e7652c27d80dfd1ccdf2779b9d3b80853e8a747a1853d318e45d', '[\"*\"]', NULL, '2022-02-24 06:43:51', '2022-02-24 06:43:51'),
(120, 'App\\Models\\User', 3, 'myapptoken', '02ea76ab5fea0b454301d6e2f18140f4d9fc0453c7a266213afafe634d115bda', '[\"*\"]', NULL, '2022-02-24 06:46:58', '2022-02-24 06:46:58'),
(121, 'App\\Models\\User', 3, 'myapptoken', '88a8c99e523d4e44b7d9024e1b1ce7bfc35ccdb3a44c3a57f935ded10b551540', '[\"*\"]', NULL, '2022-02-24 06:50:06', '2022-02-24 06:50:06'),
(122, 'App\\Models\\User', 3, 'myapptoken', '0c298c3746557488db5550d04cc2bb916ee1337a4bc254421d6788b37488718d', '[\"*\"]', NULL, '2022-02-24 07:00:01', '2022-02-24 07:00:01'),
(123, 'App\\Models\\User', 3, 'myapptoken', '4dd3575f00cd9e3ddf4f86ba633143059efdc034a6e628e6a0458e03c38b305d', '[\"*\"]', NULL, '2022-02-24 07:44:14', '2022-02-24 07:44:14'),
(124, 'App\\Models\\User', 3, 'myapptoken', 'c67636d50689f7490ff677dd497feea9042b2bb1bc0ccdb23164a2f22a1d2c31', '[\"*\"]', NULL, '2022-02-24 07:47:30', '2022-02-24 07:47:30'),
(125, 'App\\Models\\User', 3, 'myapptoken', 'f63d089ef86a71ac2207088ac2c726c0305c55f22ab197386cd4ad833d7cab80', '[\"*\"]', NULL, '2022-02-24 11:15:11', '2022-02-24 11:15:11'),
(126, 'App\\Models\\User', 3, 'myapptoken', 'd8f1a29eb94b90a733950ff02cd248e0eb38472d943e161e666604909ab7b9ef', '[\"*\"]', NULL, '2022-02-24 11:16:19', '2022-02-24 11:16:19'),
(127, 'App\\Models\\User', 3, 'myapptoken', '6d7d4b68abef0ec1076852571b1258ca96dba0c65d143b9d150d6e24df0dc47c', '[\"*\"]', NULL, '2022-02-24 11:17:45', '2022-02-24 11:17:45'),
(128, 'App\\Models\\User', 3, 'myapptoken', 'cc3c8edc8f04f268bedd5549c1ca3c3a4b081d16f7c34bdc41b8a1138ae07d9f', '[\"*\"]', NULL, '2022-02-24 11:22:39', '2022-02-24 11:22:39'),
(129, 'App\\Models\\User', 3, 'myapptoken', 'e580ca51c7b1ae091d7947791591e92278557a3ebbc30bb878ba4d6dea04a684', '[\"*\"]', '2022-02-24 12:26:53', '2022-02-24 12:25:52', '2022-02-24 12:26:53'),
(130, 'App\\Models\\User', 3, 'myapptoken', '774640b42e447758c44d40780171dd67dda93a8db6c2317343626b6ac07c28fc', '[\"*\"]', NULL, '2022-02-24 13:33:09', '2022-02-24 13:33:09'),
(131, 'App\\Models\\User', 3, 'myapptoken', 'c4258066a9ded3151b24958a0e72416c9cb620613c761fa87285497f8c68ee31', '[\"*\"]', '2022-02-25 22:52:13', '2022-02-24 13:33:49', '2022-02-25 22:52:13'),
(132, 'App\\Models\\User', 1, 'myapptoken', '1d15e25c6f4b4753e40146c8dcb1cb6e19735fd37797b009928dd1a82b3cf000', '[\"*\"]', NULL, '2022-02-25 22:52:42', '2022-02-25 22:52:42'),
(133, 'App\\Models\\User', 3, 'myapptoken', '9d7e75b298aa058582f2cafa6e9c50718e650a7c1a43aaba454e51a83dff164b', '[\"*\"]', '2022-02-25 22:57:15', '2022-02-25 22:57:02', '2022-02-25 22:57:15'),
(134, 'App\\Models\\User', 3, 'myapptoken', '93bf8b58cd479420da00dd2a84bcb7a8eb31c2ba57046d2d86ccfb1a92ace162', '[\"*\"]', NULL, '2022-02-25 22:57:03', '2022-02-25 22:57:03'),
(135, 'App\\Models\\User', 3, 'myapptoken', 'fb9c49a90b2212f483a50f380b513aa9b11897b0784427c994bed8d635e4b987', '[\"*\"]', NULL, '2022-02-25 22:59:21', '2022-02-25 22:59:21'),
(136, 'App\\Models\\User', 1, 'myapptoken', 'f2f52e3537f070639b9e3007bbd407e16f42c5bf9d5e4a536fc1239c16c71ddf', '[\"*\"]', NULL, '2022-02-25 22:59:34', '2022-02-25 22:59:34'),
(137, 'App\\Models\\User', 3, 'myapptoken', '4a6d1fb6f7f1ab12f845a1a96f57d25c2535fa0d88f72f3df8b172c889492a7b', '[\"*\"]', NULL, '2022-02-25 23:01:16', '2022-02-25 23:01:16'),
(138, 'App\\Models\\User', 3, 'myapptoken', '75860a197f763a00cca596f1168f4effef8ab74ef066222dc47949854398401b', '[\"*\"]', NULL, '2022-02-26 00:56:43', '2022-02-26 00:56:43');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double(8,2) DEFAULT NULL,
  `published` tinyint(1) NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `sold` int(11) DEFAULT NULL,
  `discount_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `slug`, `description`, `image`, `price`, `published`, `stock`, `sold`, `discount_id`, `created_at`, `updated_at`) VALUES
(1, 'Spicy seasoned seafood noodles', 'spicy-seasoned-seafood-noodles', 'gfdg', 'assets/images/Image5.png', 3.00, 0, 333, NULL, 3, '2022-02-20 13:42:56', '2022-02-20 13:42:56'),
(2, 'Salted Pasta with mushroom sauce', 'dfgdfgfggdsgs', 'hfghf', 'assets/images/Image2.png', 4.00, 0, 344, NULL, 45, '2022-02-20 21:37:33', '2022-02-20 21:37:33'),
(3, 'Healthy noodle gone', 'healthy-noodle-gone', 'fhfgh', 'assets/images/1645688872.png', 45.00, 0, 433, NULL, 22, '2022-02-20 23:08:36', '2022-02-24 01:47:52'),
(4, 'Hot spicy fried rice with omelets', 'ghhjghj', 'dgdfg', 'assets/images/Image1.png', 3.00, 0, 220, NULL, 4, '2022-02-21 00:08:03', '2022-02-21 00:08:03'),
(5, 'Beef dumpling in hot and sour soup', 'sdfsdf', 'dfdsf', 'assets/images/Image4.png', 34.00, 0, 533, NULL, 4, '2022-02-21 01:27:58', '2022-02-21 01:27:58'),
(6, 'Spicy instant noodle with special omelette', 'gfhfgjfdhjfgh', 'dsgfdgfdg', 'assets/images/Image5.png', 33.00, 0, 23, NULL, 2, '2022-02-21 02:15:03', '2022-02-21 02:15:03'),
(10, 'Beef Chilie Russian Pastry With Salami', 'beef-chilie-russian-pastry-with-salami', 'sdfsdf', 'assets/images/1645688082.png', 22.00, 0, 23, NULL, 1, '2022-02-23 01:42:30', '2022-02-24 01:34:42'),
(13, 'Sweet Black Rose Apple', 'sweet-black-rose-apple', 'null', 'assets/images/1645851435.png', 5.00, 0, 2, NULL, 1, '2022-02-24 03:17:31', '2022-02-25 22:57:15');

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`id`, `product_id`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 2, 2, NULL, NULL),
(13, 3, 3, NULL, NULL),
(14, 4, 4, NULL, NULL),
(15, 5, 5, NULL, NULL),
(16, 6, 6, NULL, NULL),
(17, 10, 2, NULL, NULL),
(19, 13, 6, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','staff','user') COLLATE utf8mb4_unicode_ci DEFAULT 'user',
  `address` mediumtext COLLATE utf8mb4_unicode_ci,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `role`, `address`, `password`, `email_verified_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Tanvir', 'Reza', 'tanvirrezaanik@gmail.com', 'user', NULL, '$2y$10$pwSZ7wbtwgduGed9pUOkhOVqNTn.foccSlPk7gOrZO91VrABSGSPO', NULL, NULL, '2022-02-13 19:35:34', '2022-02-13 19:35:34'),
(3, 'Anik', 'Reza', 'posAdmin@gmail.com', 'admin', NULL, '$2y$10$mF7mxiCNxKg.suolFuqpjuCQGgC/LNKDw7hRM.BpB/8c0htGGFJCq', NULL, NULL, '2022-02-13 19:41:59', '2022-02-13 19:41:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_name_unique` (`name`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`);

--
-- Indexes for table `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_title_unique` (`title`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
