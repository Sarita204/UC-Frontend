async Productstatus(req, res) {
    try {
        let { id, status } = req.body;
        console.log("ckeckStatus", id, status)
        let data = await productModel1.findOneAndUpdate(
            { _id: id },
            { $set: { status: status } },
            { new: true }
        );

        if (!data) return res.status(400).json({ error: "Data not found" });
        if (data.status == "Inactive") {
            return res.status(200).json({ success: "Successfully Inactive", data: data });
        } else {
            return res.status(200).json({ success: "Successfully Active", data: data });

        }


    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}