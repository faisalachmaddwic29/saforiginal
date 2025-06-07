export const downloadFile = async (url: string) => {
    const loading = useLoading();
    const config = useRuntimeConfig();
    // const toast = useToast();

    loading.toggle();

    try {
        // Make the AJAX request to get the file
        const response = await fetch(config.public.apiUrl + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/octet-stream',
            },
        });

        // Check if the request was successful
        if (!response.ok) {
            // toast.add({
            //     severity: "error",
            //     summary: 'Error',
            //     detail: `Failed to download file: ${response.statusText}`,
            //     life: 5000,
            // });

            console.error('Failed to download file:', response);
            alert('Failed to download file');
            // throw new Error(`Failed to download file: ${response.statusText}`);
        }

        // Extract the filename and extension from the Content-Disposition header
        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = 'downloaded-file';

        if (contentDisposition) {
            const match = contentDisposition.match(/filename="?([^"]+)"?/);
            if (match && match[1]) {
                filename = match[1];
            }
        }

        // Extract the file extension
        const fileExtension = filename.split('.').pop();

        // Convert the response to a Blob
        const blob = await response.blob();

        // Create a temporary URL for the blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;

        // Append the link to the body (required for Firefox)
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);

        // Release the object URL
        window.URL.revokeObjectURL(blobUrl);

        console.log(`Downloaded file: ${filename} `);
    } catch (error) {
        // toast.add({
        //     severity: "error",
        //     summary: 'Error',
        //     detail: `Error downloading file`,
        //     life: 5000,
        // });
        console.error('Error downloading file:', error);
        alert('Error downloading file');
    }


    loading.toggle();
};
