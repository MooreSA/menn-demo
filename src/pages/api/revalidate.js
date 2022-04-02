const revalidationHandler = async (req, res) => {
  try {
    console.log(process.env.REVALIDATION_SECRET);
    console.log(req.query.secret);
    await res.unstable_revalidate("/api-isr");
    console.log("Revalidated");
    return res.status(200).json({ revalidated: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ revalidated: false });
  }
};

export default revalidationHandler;
